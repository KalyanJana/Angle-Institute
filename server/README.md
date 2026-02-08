# Lalani Academy Server

Express.js + TypeScript backend for the Lalani Academy website.

## Folder Structure

```
src/
├── index.ts                 # Main entry point
├── config/
│   └── app.ts              # Express app setup
├── routes/
│   ├── enquiries.ts        # Enquiry CRUD endpoints
│   └── contact.ts          # Legacy contact endpoint
├── controllers/
│   └── EnquiryController.ts # Request handlers
├── services/
│   └── EnquiryService.ts   # Business logic & data persistence
├── models/
│   └── Enquiry.ts          # Data model & validation
└── utils/
    └── logger.ts           # Logging utility

data/
└── enquiries.json          # Persisted enquiries (auto-generated)
```

## Setup

```bash
npm install
npm run build
npm start
```

## Development

```bash
npm run dev      # Watch mode with auto-rebuild
```

## API Endpoints

### Health Check

- `GET /api/health` - Server status

### Enquiries

#### Create Enquiry

```
POST /api/enquiries
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9999999999",
  "subject": "Course Enquiry",
  "message": "I want to enroll in the Excel course"
}
```

#### Get All Enquiries

```
GET /api/enquiries
```

#### Get Single Enquiry

```
GET /api/enquiries/:id
```

#### Update Enquiry Status

```
PATCH /api/enquiries/:id
Content-Type: application/json

{
  "status": "read"  // new | read | replied
}
```

#### Delete Enquiry

```
DELETE /api/enquiries/:id
```

### Legacy Contact

- `POST /api/contact` - Submit contact form (maps to enquiry with default subject)

## Data Persistence

Enquiries are stored in `data/enquiries.json` using the file system. This is ideal for development and small deployments. For production, consider using a database like MongoDB or PostgreSQL.

## Environment Variables

```
PORT=4000           # Server port (default 4000)
DEBUG=true         # Enable debug logging
```

## Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run build:watch` - Watch mode for TypeScript
- `npm start` - Run production server
- `npm run dev` - Run dev server with auto-reload (requires nodemon)
