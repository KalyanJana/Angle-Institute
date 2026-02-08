# API Documentation

## Server Architecture

```
Index (Entry)
    ↓
Config (App Setup - CORS, Middleware)
    ↓
Routes (Request Routing)
    ├─ /api/enquiries
    └─ /api/contact
    ↓
Controllers (Request Handlers)
    ├─ EnquiryController
    └─ ContactController
    ↓
Services (Business Logic)
    └─ EnquiryService
    ↓
Models (Data Validation & Structure)
    └─ Enquiry
    ↓
Utils (Helpers)
    └─ Logger
```

## API Endpoints

### Health Check

```
GET /api/health
Response: { status: "ok", timestamp: "2026-02-08T..." }
```

### Enquiry Management

#### Create Enquiry

```
POST /api/enquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9999999999",
  "subject": "Interested in Excel course",
  "message": "I want to know more about the course duration"
}

Response (201):
{
  "ok": true,
  "message": "Enquiry submitted successfully",
  "enquiry": {
    "id": "1707403200000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9999999999",
    "subject": "Interested in Excel course",
    "message": "I want to know more about the course duration",
    "createdAt": "2026-02-08T10:00:00.000Z",
    "status": "new"
  }
}
```

#### Get All Enquiries

```
GET /api/enquiries

Response (200):
{
  "enquiries": [
    { ... },
    { ... }
  ],
  "count": 5
}
```

#### Get Single Enquiry

```
GET /api/enquiries/:id

Response (200):
{
  "id": "1707403200000",
  "name": "John Doe",
  ...
}
```

#### Update Enquiry Status

```
PATCH /api/enquiries/:id
Content-Type: application/json

{
  "status": "read"  // "new" | "read" | "replied"
}

Response (200):
{
  "ok": true,
  "enquiry": { ... }
}
```

#### Delete Enquiry

```
DELETE /api/enquiries/:id

Response (200):
{
  "ok": true,
  "message": "Enquiry deleted"
}
```

### Legacy Contact (Maps to Enquiry)

```
POST /api/contact
Content-Type: application/json

{
  "name": "Jane",
  "email": "jane@example.com",
  "message": "Hello"
}

Response (200):
{
  "ok": true,
  "message": "Contact received",
  "enquiry": { ... }
}
```

## Error Responses

### 400 Bad Request

```json
{
  "error": "Validation failed",
  "errors": ["Name is required", "Valid email is required"]
}
```

### 404 Not Found

```json
{
  "error": "Enquiry not found"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to create enquiry"
}
```

## Data Model

### Enquiry

```typescript
{
  id: string; // Timestamp-based unique ID
  name: string; // Customer name
  email: string; // Customer email
  phone: string; // Customer phone
  subject: string; // Enquiry subject
  message: string; // Enquiry message
  createdAt: string; // ISO timestamp
  status: "new" | "read" | "replied"; // Processing status
}
```

## Persistence

All enquiries are persisted to `server/data/enquiries.json` automatically. This file is created on first enquiry submission.

Sample file structure:

```json
[
  {
    "id": "1707403200000",
    "name": "John",
    "email": "john@example.com",
    "phone": "+91-9999999999",
    "subject": "Course enquiry",
    "message": "Want to know more",
    "createdAt": "2026-02-08T10:00:00.000Z",
    "status": "new"
  }
]
```

## Development

Run the server in watch mode:

```bash
npm run dev
```

This will:

1. Compile TypeScript changes automatically
2. Restart the server on file changes
3. Log requests with timestamps

## Testing with curl

```bash
# Create enquiry
curl -X POST http://localhost:4000/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "+91-1234567890",
    "subject": "Test",
    "message": "Test message"
  }'

# Get all enquiries
curl http://localhost:4000/api/enquiries

# Get single enquiry
curl http://localhost:4000/api/enquiries/1707403200000

# Update status
curl -X PATCH http://localhost:4000/api/enquiries/1707403200000 \
  -H "Content-Type: application/json" \
  -d '{"status": "read"}'

# Delete enquiry
curl -X DELETE http://localhost:4000/api/enquiries/1707403200000
```
