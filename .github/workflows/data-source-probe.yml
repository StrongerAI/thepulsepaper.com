import requests
import json

UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}

# Yahoo Finance v8 chart symbols to test
symbols = {
    # Commodities
    "Brent":         "BZ=F",
    "WTI":           "CL=F",
    "Natural Gas":   "NG=F",
    "Gold":          "GC=F",
    "Silver":        "SI=F",
    # US equities
    "S&P 500":       "^GSPC",
    "Nasdaq":        "^IXIC",
    "Dow Jones":     "^DJI",
    # European equities
    "FTSE 100":      "^FTSE",
    "DAX":           "^GDAXI",
    "CAC 40":        "^FCHI",
    "Stoxx 600":     "^STOXX",
    # Asian equities
    "Nikkei 225":    "^N225",
    "Shanghai Comp": "000001.SS",
    "Hang Seng":     "^HSI",
    "Sensex":        "^BSESN",
    "KOSPI":         "^KS11",
    # FX
    "EUR/USD":       "EURUSD=X",
    "GBP/USD":       "GBPUSD=X",
    "USD/CNY":       "CNY=X",
    "USD/PKR":       "PKR=X",
}

base = "https://query1.finance.yahoo.com/v8/finance/chart/"

for name, sym in symbols.items():
    url = f"{base}{sym}?interval=1d&range=5d"
    try:
        r = requests.get(url, timeout=15, headers=UA)
        if r.status_code != 200:
            print(f"FAIL {r.status_code} | {name:<15} | {sym}")
            continue
        data = r.json()
        result = data.get("chart", {}).get("result")
        if not result:
            err = data.get("chart", {}).get("error", {})
            print(f"NORESULT  | {name:<15} | {sym} | {err}")
            continue
        quote = result[0]["indicators"]["quote"][0]
        closes = [c for c in quote.get("close", []) if c is not None]
        if not closes:
            print(f"NOCLOSE   | {name:<15} | {sym}")
            continue
        latest = closes[-1]
        prev = closes[-2] if len(closes) > 1 else None
        print(f"OK        | {name:<15} | {sym:<12} | close={latest:.2f}" + (f"  prev={prev:.2f}" if prev else ""))
    except Exception as e:
        print(f"ERR       | {name:<15} | {sym} | {e}")
