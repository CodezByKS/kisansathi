# API contract

## POST /api/recommend/

Request:
```json
{
  "language": "hi",
  "state": "Uttar Pradesh",
  "district": "Lucknow",
  "soil_type": "alluvial",
  "season": "kharif",
  "water_source": "borewell",
  "land_acres": 2
}
```
soil_type: alluvial, black, red, laterite, sandy, clay, loamy
season: kharif, rabi, zaid
water_source: rainfed, canal, borewell, pond
language: en, hi

Response 201:
```json
{
  "report_id": "a1b2c3d4",
  "language": "hi",
  "weather": { "temperature": 28.4, "humidity": 72, "rainfall_mm": 850 },
  "recommendations": [
    {
      "crop": "rice",
      "confidence": 0.87,
      "yield_per_ha": 3.1,
      "price": { "current": 2200, "forecast_30d": 2350, "unit": "INR/quintal" },
      "profit": { "good": 52000, "average": 38000, "bad": 12000 },
      "why": "Explanation text in the chosen language",
      "calendar": [ { "month": "Jun", "task": "Nursery preparation" } ]
    }
  ],
  "schemes": [ { "name": "PM-KISAN", "benefit": "Short description" } ],
  "disclaimer": "Advisory estimate. Not a bank-certified document."
}
```
Errors: 400 with field errors.

## GET /api/report/<report_id>/        stored result JSON, 404 if missing
## GET /api/report/<report_id>/pdf/    loan-ready PDF
## GET /api/health/                    {"status": "ok"}