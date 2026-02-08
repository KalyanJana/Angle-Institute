# Server Project Structure

```
server/
├── src/
│   ├── index.ts                    # Main entry point - initializes app and routes
│   │
│   ├── config/
│   │   └── app.ts                  # Express app setup with middleware
│   │
│   ├── routes/                     # API route handlers
│   │   ├── enquiries.ts            # CRUD endpoints for enquiries
│   │   └── contact.ts              # Legacy contact endpoint
│   │
│   ├── controllers/                # Request/response handlers
│   │   └── EnquiryController.ts    # Business logic orchestration
│   │
│   ├── services/                   # Data access & business logic
│   │   └── EnquiryService.ts       # CRUD operations & persistence
│   │
│   ├── models/                     # Data models & validation
│   │   └── Enquiry.ts              # Enquiry interface & validator
│   │
│   └── utils/                      # Helper utilities
│       └── logger.ts               # Logging utility
│
├── data/                           # Auto-generated data files
│   └── enquiries.json              # Persisted enquiries
│
├── dist/                           # Compiled JavaScript (generated)
│   └── (auto-generated files)
│
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore file
├── README.md                       # Quick start guide
├── API.md                          # API documentation
└── STRUCTURE.md                    # This file

```

## File Responsibilities

### `src/index.ts`

- **Purpose**: Application entry point
- **Responsibilities**:
  - Initialize Express app using setupApp()
  - Register all routes (/api/enquiries, /api/contact, /api/enquiry)
  - Setup SPA fallback with setupStaticFiles()
  - Start server and log startup info

### `src/config/app.ts`

- **Purpose**: Centralized Express configuration
- **Responsibilities**:
  - Create and configure Express app
  - Apply CORS middleware
  - Apply body parser middleware
  - Add request logging middleware
  - Setup static file serving for SPA

### `src/routes/enquiries.ts`

- **Purpose**: Define enquiry API routes
- **Routes**:
  - `POST /api/enquiries` → EnquiryController.create
  - `GET /api/enquiries` → EnquiryController.getAll
  - `GET /api/enquiries/:id` → EnquiryController.getById
  - `PATCH /api/enquiries/:id` → EnquiryController.updateStatus
  - `DELETE /api/enquiries/:id` → EnquiryController.delete

### `src/routes/contact.ts`

- **Purpose**: Legacy contact endpoint support
- **Routes**:
  - `POST /api/contact` → Maps to enquiry creation

### `src/controllers/EnquiryController.ts`

- **Purpose**: Handle HTTP request/response logic
- **Methods**:
  - `create()` - Validate input, call service, return response
  - `getAll()` - Fetch all enquiries via service
  - `getById()` - Fetch single enquiry via service
  - `updateStatus()` - Update enquiry status via service
  - `delete()` - Delete enquiry via service
- **Responsibilities**:
  - Request validation
  - Error handling
  - Response formatting
  - HTTP status code selection

### `src/services/EnquiryService.ts`

- **Purpose**: Handle data access & persistence
- **Methods**:
  - `create()` - Create and persist new enquiry
  - `getAll()` - Load all enquiries from file
  - `getById()` - Find enquiry by ID
  - `updateStatus()` - Update enquiry status
  - `delete()` - Remove enquiry
- **Responsibilities**:
  - File I/O operations
  - Data persistence
  - Business logic
  - File directory management

### `src/models/Enquiry.ts`

- **Purpose**: Data structure & validation
- **Exports**:
  - `Enquiry` interface - TypeScript type definition
  - `EnquiryModel` class - Static methods for creation & validation
- **Methods**:
  - `create()` - Create new enquiry with defaults
  - `validate()` - Validate enquiry data, return errors

### `src/utils/logger.ts`

- **Purpose**: Centralized logging
- **Methods**:
  - `info()` - Log info messages
  - `error()` - Log errors
  - `warn()` - Log warnings
  - `debug()` - Log debug messages (respects DEBUG env var)

## Data Flow

1. **Client Request** → Express Server
2. **Route Handler** (`routes/`) → Matches URL pattern
3. **Controller** (`controllers/`) → Validates request, calls service
4. **Service** (`services/`) → Executes business logic, accesses data
5. **Model** (`models/`) → Provides data structure & validation
6. **Persistence** (`data/enquiries.json`) → File system storage
7. **Response** → Controller formats and sends response back

## Adding New Features

### To add a new endpoint:

1. **Create Model** (if needed)

   ```typescript
   // src/models/NewModel.ts
   export interface NewData { ... }
   export class NewModel { ... }
   ```

2. **Create Service**

   ```typescript
   // src/services/NewService.ts
   export class NewService {
     static create(data) { ... }
     static getAll() { ... }
   }
   ```

3. **Create Controller**

   ```typescript
   // src/controllers/NewController.ts
   export class NewController {
     static create(req, res) { ... }
     static getAll(req, res) { ... }
   }
   ```

4. **Create Routes**

   ```typescript
   // src/routes/new.ts
   router.post("/", NewController.create);
   router.get("/", NewController.getAll);
   ```

5. **Register in index.ts**
   ```typescript
   import newRoutes from "./routes/new";
   app.use("/api/new", newRoutes);
   ```

## Best Practices

- **Models** → Validation logic only
- **Services** → Business logic & data access
- **Controllers** → HTTP concerns only (validation formatting, status codes)
- **Routes** → Route definitions and method mapping only
- **Config** → App setup and middleware only
