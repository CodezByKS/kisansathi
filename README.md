<!-- # KisanSathi AI

AI-based crop recommendation for farmers. Input: location, soil type, season, water source.
Output: best crops, yield, mandi price forecast, profit scenarios, schemes, seasonal calendar,
and a loan-ready PDF in Hindi or English.

Principle: ML models and data APIs produce every number. Gemini only explains them.

## Parts
1. frontend/  React UI
2. backend/   Django REST, database, GenAI, PDF
3. ml/        crop, yield and price models

## Docs
See docs/ for architecture, requirements, API contract and ML design.
 -->


# 🌾 KisanSathi AI

AI-based crop recommendation system for farmers.

Farmers provide their location, soil type, season, and water availability. The system recommends suitable crops, estimates yield, forecasts mandi prices, calculates profit scenarios, suggests government schemes, and generates a loan-ready PDF report in Hindi or English.

## Core Principle

ML models and verified data APIs produce numerical predictions. Gemini AI only explains the results.

## Technology Stack

- Frontend: React + Vite
- Backend: Django REST Framework
- Database: PostgreSQL
- AI: Google Gemini API
- ML: Python, Scikit-learn
- Reports: PDF Generation

## Project Structure

1. frontend/ — React UI
2. backend/ — Django REST API
3. ml/ — Crop, yield and price prediction models
4. docs/ — Project documentation

## Features

- AI-based crop recommendations
- Weather integration
- Yield estimation
- Mandi price forecasting
- Profit analysis
- Seasonal farming calendar
- Hindi and English support
- Downloadable PDF reports
