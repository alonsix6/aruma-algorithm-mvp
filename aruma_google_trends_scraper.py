#!/usr/bin/env python3
"""
Aruma Algorithm - Google Trends Scraper
Extrae tendencias de búsqueda para keywords de beauty
"""

from pytrends.request import TrendReq
import pandas as pd
import json
import time
from datetime import datetime
import os
import sys

# Configuración
REGION = os.getenv('REGION', 'PE')
BEAUTY_KEYWORDS = [
    'skincare', 'cerave', 'niacinamide', 
    'retinol', 'maquillaje', 'protector solar',
    'serum facial', 'hidratante', 'limpiador facial'
]

def fetch_trends_data():
    """Obtiene datos de Google Trends para beauty keywords"""
    
    print("🔍 Iniciando scraping de Google Trends...")
    print(f"📍 Región: {REGION}")
    
    # Inicializar pytrends (NO NECESITA API KEY)
    pytrends = TrendReq(
        hl='es-PE',
        tz=-300,  # Peru timezone
        timeout=(10, 25),
        retries=3,
        backoff_factor=0.3
    )
    
    results = {
        'timestamp': datetime.now().isoformat(),
        'region': REGION,
        'category': 'Beauty & Fitness',
        'source': 'Google Trends',
        'keywords': []
    }
    
    # Procesar keywords en grupos de 5 (límite de Google Trends)
    for i in range(0, len(BEAUTY_KEYWORDS), 5):
        batch = BEAUTY_KEYWORDS[i:i+5]
        
        try:
            print(f"\n📊 Procesando: {', '.join(batch)}")
            
            pytrends.build_payload(
                kw_list=batch,
                cat=44,  # Beauty & Fitness category
                timeframe='today 3-m',
                geo=REGION
            )
            
            # 1. Interest Over Time
            interest_df = pytrends.interest_over_time()
            
            # 2. Interest by Region
            try:
                region_df = pytrends.interest_by_region(resolution='REGION', inc_low_vol=True)
            except:
                region_df = pd.DataFrame()
            
            # 3. Related Queries
            try:
                related = pytrends.related_queries()
            except:
                related = {}
            
            # Procesar cada keyword
            for keyword in batch:
                keyword_data = {
                    'keyword': keyword,
                    'average_interest': 0,
                    'trend': 'stable',
                    'interest_over_time': {},
                    'top_regions': {},
                    'rising_queries': []
                }
                
                # Interest over time
                if not interest_df.empty and keyword in interest_df.columns:
                    series = interest_df[keyword]
                    keyword_data['interest_over_time'] = {
                        str(date.date()): int(value) 
                        for date, value in series.items() 
                        if pd.notna(value)
                    }
                    keyword_data['average_interest'] = int(series.mean())
                    
                    # Calcular tendencia
                    recent = series.tail(7).mean()
                    older = series.head(7).mean()
                    if recent > older * 1.1:
                        keyword_data['trend'] = 'rising'
                    elif recent < older * 0.9:
                        keyword_data['trend'] = 'falling'
                
                # Top regions
                if not region_df.empty and keyword in region_df.columns:
                    top_5 = region_df.nlargest(5, keyword)
                    keyword_data['top_regions'] = {
                        str(region): int(score) 
                        for region, score in top_5[keyword].items()
                    }
                
                # Rising queries
                if keyword in related and related[keyword] and 'rising' in related[keyword]:
                    rising_df = related[keyword]['rising']
                    if rising_df is not None and not rising_df.empty:
                        keyword_data['rising_queries'] = rising_df.head(5)['query'].tolist()
                
                results['keywords'].append(keyword_data)
                print(f"  ✓ {keyword}: avg interest = {keyword_data['average_interest']}, trend = {keyword_data['trend']}")
            
            # Esperar para evitar rate limit
            time.sleep(3)
            
        except Exception as e:
            print(f"  ⚠️ Error con {batch}: {e}")
            continue
    
    # Guardar resultados
    output_dir = os.path.join(os.path.dirname(__file__), '../data/trends')
    os.makedirs(output_dir, exist_ok=True)
    
    timestamp_str = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(output_dir, f'trends_{timestamp_str}.json')
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    # Guardar también como latest.json
    latest_file = os.path.join(output_dir, 'latest.json')
    with open(latest_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Datos guardados en {output_file}")
    print(f"✅ Latest: {latest_file}")
    print(f"📈 Total keywords procesadas: {len(results['keywords'])}")
    
    return results

if __name__ == '__main__':
    try:
        fetch_trends_data()
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error fatal: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)