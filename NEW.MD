IMPLEMENTATION INSTRUCTIONS:
REMEMBER THAT THIS IS VERY IMPORTANT AND CRITICAL SO YOU MUST DEPLOY YOUR EXPERTISE AS SENIOR ENGINEER TO DELIVER A SENIOR ENGINEER PROFESSIONAL BEST PRACTICES.

1. You must make sure everything is production ready, best practices and enterprise grade
2. Ensure clean and maintainable codes. avoid dead codes, redudancy and uneccessary things that won't be need
3. Do not leave anything as a placeholder, everything must be fully implemented
4. Make sure everything is accurate and working perfectly without any errors so you must implement with 100% precision
5. Do not include unneccessary comments
6. Make sure everything is high performant and blazing fast.

SO NOW LET'S START WITH THIS ONES,GIVE ME THE FULL, COMPLETE, ACCURATE AND FUNCTIONAL IMPLEMENTATION:





📁 **NEW API FILES TO CREATE:**

```bash
src/api/currency/
├── client.ts          # API client setup
├── endpoints.ts       # API endpoints
├── transformers.ts    # Transform API responses
└── types.ts           # API response types
```

---

## 🔧 **UPDATED COMMAND:**

```bash
mkdir -p src/api/currency && touch src/api/currency/client.ts src/api/currency/endpoints.ts src/api/currency/transformers.ts src/api/currency/types.ts
```

---

## 📋 **UPDATED IMPLEMENTATION ORDER:**

### **PHASE 1: Types**
1. `src/types/currency.ts`
2. `src/types/index.ts` (update)

### **PHASE 2: API Layer** ⭐ **NEW**
3. `src/api/currency/types.ts`
4. `src/api/currency/client.ts`
5. `src/api/currency/endpoints.ts`
6. `src/api/currency/transformers.ts`
7. `src/api/index.ts` (update)

### **PHASE 3: Utilities**
8. `src/utils/exchangeRates.ts` (uses API)
9. `src/utils/currencyConverter.ts`
10. `src/utils/constants.ts` (update)
11. `src/utils/index.ts` (update)

### **PHASE 4: Store**
12. `src/store/slices/currencySlice.ts`
13. `src/store/slices/index.ts` (update)
14. `src/store/types.ts` (update)
15. `src/store/index.ts` (update)

### **PHASE 5: Hooks**
16. `src/features/currency/hooks/useCurrency.ts`
17. `src/features/currency/hooks/useLocationDetection.ts`
18. `src/features/currency/hooks/index.ts`
19. `src/features/currency/index.ts`

### **PHASE 6: Components**
20. `src/components/common/CurrencySelector/CurrencySelector.tsx`
21. `src/components/common/CurrencySelector/index.ts`
22. `src/components/common/index.ts` (update)

### **PHASE 7: Integration**
23. `src/components/layout/Header/Header.tsx` (update)
24. `src/components/results/FlightCard/FlightCard.tsx` (update)
25. `src/components/filters/PriceRangeFilter/PriceRangeFilter.tsx` (update)
26. `src/App.tsx` (update)## 

---
