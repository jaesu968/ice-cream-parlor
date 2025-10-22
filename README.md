# React Native Working with Data Lab: Ice Cream Parlor

An ice cream flavors mobile application demonstrating robust React Native data management with offline-first architecture, smart caching, and network resilience.

## ✅ Completed Features

### 🗂️ Centralized Storage Key Management
**File:** `src/constants/storageKeys.ts`
- Namespaced key generators to prevent storage collisions
- Organized storage with prefixes for caches, data, and timestamps
- Easy-to-maintain centralized storage key configuration

### 💾 Caching Utilities with Expiration
**File:** `src/utils/cacheUtils.ts`
- `createCache()` - Store data with configurable TTL (default 30 minutes)
- `getCache()` - Retrieve cached data with automatic expiration validation
- `removeCache()` - Remove specific cache entries
- `clearAllCache()` - Bulk cache clearing

### 🔄 Network Utilities with Retry Logic
**File:** `src/utils/networkUtils.ts`
- `fetchWithRetry()` - Automatic retry with exponential backoff (3 attempts by default)
- Smart error handling that distinguishes between client (4xx) and server errors
- `getErrorMessage()` - User-friendly error messages for common HTTP status codes
- Prevents unnecessary retries on client errors

### 📡 Integrated Data Service
**File:** `src/services/dataService.ts`
- **Offline-First Pattern:** Loads cached data immediately while fetching fresh data in background
- `fetchIceCreamFlavors()` - Smart fetching with cache-first fallback strategy
- `loadFromCache()` - Retrieve only cached data
- `clearCachedData()` - Remove all stored data and timestamps
- Automatic data cleaning (emoji removal, type validation)

### 🎣 Custom React Hook
**File:** `src/hooks/useIceCreamData.ts`
- `useIceCreamData()` - Complete state management for flavor data
- Tracks loading state, data source (cache vs network), and last fetch timestamp
- User feedback via dismissible message banners (3-second duration)
- Fallback logic: Network → Cache → Error messaging

### 🎨 User Interface
**File:** `App.tsx` & `src/components/`
- Real-time status indicator showing data source (green for fresh, amber for cached)
- Flavor count and data source display
- Last fetch timestamp tracking
- Button grid for: Fetch, Load from Storage, Clear Display, Clear Storage
- Interactive FlatList with ice cream flavor cards
- Dismissible toast notifications for user feedback

### 📋 Type Safety
**File:** `src/types/IceCreamFlavor.ts`
- TypeScript interface ensuring data consistency
- Properties: id, name, description, price, category, image, rating, availability

## 🛡️ Stability & Reliability Features

### Robust Error Handling
- **Automatic Retry Logic:** Failed network requests automatically retry up to 3 times with exponential backoff
- **Graceful Degradation:** When network fails, app seamlessly falls back to cached data
- **HTTP Status Handling:** Client errors (4xx) fail fast without retries; server errors (5xx) trigger intelligent retries
- **User-Friendly Messages:** All errors display clear, actionable messages

### Data Integrity
- **Automatic Data Cleaning:** Emojis and special characters stripped from flavor names for consistency
- **Type Validation:** Strict TypeScript types prevent runtime errors
- **Cache Expiration:** Automatic cleanup of stale data with configurable TTL (default 30 minutes)
- **Timestamp Tracking:** All cached data includes fetch timestamps for transparency

### Performance Optimization
- **Offline-First Pattern:** Instant data display from cache while fetching fresh data in background
- **Fire-and-Forget Updates:** Background cache refreshes don't block the UI
- **Namespaced Storage Keys:** Organized AsyncStorage prevents data collisions
- **Efficient Cache Management:** Bulk cache clearing with prefix-based filtering

## Project Structure

```
├── App.tsx                          # Main app component with UI
├── src/
│   ├── components/
│   │   ├── ButtonGrid.tsx          # Action buttons
│   │   ├── FlavorItem.tsx          # Individual flavor card
│   │   └── MessageBanner.tsx       # Toast notifications
│   ├── constants/
│   │   └── storageKeys.ts          # Centralized storage key management
│   ├── hooks/
│   │   └── useIceCreamData.ts      # Custom data management hook
│   ├── services/
│   │   └── dataService.ts          # Core data fetching & caching logic
│   ├── types/
│   │   └── IceCreamFlavor.ts       # TypeScript interfaces
│   └── utils/
│       ├── cacheUtils.ts           # AsyncStorage caching utilities
│       └── networkUtils.ts         # Network request with retry logic
```

## Architecture Highlights

### Offline-First Strategy
1. **Immediate Response:** Cached data loads instantly for better UX
2. **Background Update:** Fresh data fetches silently in background
3. **Automatic Fallback:** If network fails, cached data is displayed
4. **Intelligent Retry:** Failed requests retry with exponential backoff

### Cache Management
- Auto-expiring cache with 30-minute default TTL
- JSON serialization with timestamp tracking
- Prefix-based filtering for cache cleanup

### Error Handling
- User-friendly error messages
- HTTP status-specific error handling
- Graceful degradation when network unavailable

## Getting Started

### Installation
```bash
npm install
```

### Running the App
```bash
npm start          # Start Expo
npm run ios        # Run on iOS
npm run android    # Run on Android
npm run web        # Run on web
```

## Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React Native** | 0.82.1 | Cross-platform mobile framework |
| **React** | 19.2.0 | UI library and hooks (useIceCreamData) |
| **Expo** | 54.0.18 | Build and deployment platform |
| **TypeScript** | 5.9.3 | Static type checking and code safety |
| **AsyncStorage** | 2.2.0 | Local device persistence & caching |

### Key Libraries Used
- **Custom Hooks:** useIceCreamData for centralized state management
- **Network Utilities:** fetchWithRetry for resilient API calls
- **Cache Utilities:** createCache/getCache with automatic expiration
- **Storage Keys:** Centralized key management with namespacing

## Notes
- Sometimes updates can get stuck during the rendering process. If you're not seeing your latest changes, try refreshing the page.
- The app uses the Codecademy ice cream API for demo data: `https://static-assets.codecademy.com/Courses/learn-react-native-v53/05-data/icecream-data.json`