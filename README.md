# T.MORE

אתר טימור ב־React ו־Node.js, במבנה של הפרויקטים הקיימים: שרת ולקוח נפרדים, קונטרולרים בלי לוגיקה, סרביסים שמחזיקים את הנתונים, ועיצוב בקבצי CSS נפרדים.

התוכן נלקח מהגיבוי הציבורי של האתר החי.

## הרצה מקומית

בטרמינל אחד:

```bash
cd backend
npm install
npm run dev
```

בטרמינל שני:

```bash
cd frontend
npm install
npm run dev
```

האתר נפתח ב־http://localhost:5173 והשרת מאזין בפורט 4010.

## מבנה

- `backend/src/controllers` — נתיבי ה־API
- `backend/src/services` — שליפת תוכן ושמירת לידים
- `backend/data` — העמודים, התפריט ופרטי האתר
- `backend/storage/media` — התמונות שהאתר מציג
- `frontend/src/components` — מסכים לפי אזור, כל קומפוננטה עם קובץ CSS משלה
- `frontend/src/components/service` — קריאות לשרת

טפסי יצירת הקשר נשמרים מקומית ב־`backend/storage/leads/leads.json`.
