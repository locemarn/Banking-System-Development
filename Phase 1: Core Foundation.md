<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Phase 1: Core Foundation - Banking System Development

## Overview

This phase establishes the foundational structure of a simplified banking monolith with core account and transaction functionality using PostgreSQL and GraphQL. The focus is on creating a working system with modern API patterns before adding architectural complexity.

## Phase Objectives

- Build a functional monolithic banking application
- Implement core account and transaction management
- Establish basic authentication and security
- Set up containerized development environment with PostgreSQL
- Create foundational database schema and models
- Implement GraphQL API layer


## Architecture Decision Flow

![Architecture Decision Flow](./assets/phase1-flow.png)

The decision flow follows this logical progression:

1. **Database Selection**: PostgreSQL chosen for production readiness and advanced features
2. **API Design**: GraphQL selected for modern API patterns and efficient data fetching
3. **Authentication**: JWT token-based authentication for stateless operation
4. **Application Structure**: Layered monolith architecture for clear separation of concerns
5. **Containerization**: Docker Compose with PostgreSQL for consistent development environment

## System Architecture

![System Architecture](./assets/bank_monolith_application.png)

The system follows a layered architecture pattern:

- **Client Layer**: External applications interact through GraphQL endpoints
- **API Layer**: GraphQL resolvers handle requests and route to appropriate services
- **Service Layer**: Business logic for authentication, accounts, and transactions
- **Data Layer**: PostgreSQL database with proper models and relationships


## Key Architectural Decisions

### Database Choice: PostgreSQL

**Decision**: Use PostgreSQL instead of SQLite

**Rationale**: Production-ready database, better data integrity, supports advanced features needed for banking

**Trade-off**: More complex setup but provides scalability and reliability

### API Design: GraphQL

**Decision**: Implement GraphQL API from the start

**Rationale**: Single endpoint, efficient data fetching, strong typing, better client experience

**Trade-off**: Steeper learning curve but modern API standard

### Authentication: JWT Tokens

**Decision**: Use JWT for stateless authentication

**Rationale**: Works well with GraphQL, simple implementation, scalable

**Trade-off**: Token management complexity but suitable for modern applications

### Application Structure: Layered Monolith with GraphQL

**Decision**: Traditional layered architecture with GraphQL resolvers

**Rationale**: Clear separation of concerns, GraphQL provides unified interface

**Trade-off**: Less flexibility than modular design but simpler to start

## Database Models

### User Model

```sql
User {
  id: UUID (Primary Key)
  email: String (Unique, Not Null)
  password_hash: String (Not Null)
  first_name: String (Not Null)
  last_name: String (Not Null)
  document_number: String (Unique, Not Null) // CPF for Brazil
  phone: String
  is_active: Boolean (Default: true)
  created_at: Timestamp (Default: now)
  updated_at: Timestamp (Default: now)
}
```


### Account Model

```sql
Account {
  id: UUID (Primary Key)
  user_id: UUID (Foreign Key -> User.id)
  account_number: String (Unique, Not Null)
  account_type: Enum (CHECKING, SAVINGS, INVESTMENT)
  balance: Decimal(15,2) (Default: 0.00)
  currency: String (Default: 'BRL')
  is_active: Boolean (Default: true)
  created_at: Timestamp (Default: now)
  updated_at: Timestamp (Default: now)
}
```


### Transaction Model

```sql
Transaction {
  id: UUID (Primary Key)
  from_account_id: UUID (Foreign Key -> Account.id, Nullable)
  to_account_id: UUID (Foreign Key -> Account.id, Nullable)
  amount: Decimal(15,2) (Not Null)
  transaction_type: Enum (TRANSFER, DEPOSIT, WITHDRAWAL, PAYMENT)
  status: Enum (PENDING, COMPLETED, FAILED, CANCELLED)
  description: String
  reference_id: String (Unique, for idempotency)
  metadata: JSONB (for additional transaction data)
  created_at: Timestamp (Default: now)
  updated_at: Timestamp (Default: now)
}
```


### Transaction Log Model

```sql
TransactionLog {
  id: UUID (Primary Key)
  transaction_id: UUID (Foreign Key -> Transaction.id)
  previous_status: Enum
  new_status: Enum
  changed_by: UUID (Foreign Key -> User.id, Nullable)
  change_reason: String
  created_at: Timestamp (Default: now)
}
```


## Step-by-Step Implementation Instructions

### Step 1: Project Setup

**Initialize project structure**

- Create main project directory
- Set up folder structure: `/src`, `/tests`, `/docs`, `/docker`, `/migrations`
- Initialize version control (Git)

**Choose technology stack**

- Select backend framework with GraphQL support (Node.js/Apollo Server, Python/Strawberry, or Java/Spring GraphQL)
- Set up package manager and dependency management
- Add GraphQL and PostgreSQL dependencies

**Set up development environment**

- Install necessary development tools
- Configure code formatting and linting
- Set up environment variable management
- Configure GraphQL IDE/Playground


### Step 2: Database Design and Setup

**Set up PostgreSQL with Docker**

- Create Docker Compose file with PostgreSQL service
- Configure database connection parameters
- Set up database initialization scripts

**Create database models**

- Implement User model with validation rules
- Implement Account model with business constraints
- Implement Transaction model with audit capabilities
- Create TransactionLog model for compliance

**Set up database migrations**

- Create migration system for schema changes
- Implement initial migration with all tables
- Add indexes for performance (email, account_number, etc.)
- Set up foreign key constraints and triggers

**Implement data access layer**

- Create repository pattern for each entity
- Implement basic CRUD operations
- Add connection pooling and error handling
- Create database seed data for testing


### Step 3: GraphQL Schema Design

**Define GraphQL types**

- Create User type with secure field exposure
- Create Account type with balance protection
- Create Transaction type with proper relationships
- Define input types for mutations

**Design Query operations**

- `me` - Get current user profile
- `accounts` - Get user's accounts
- `account(id: ID!)` - Get specific account
- `transactions(accountId: ID, limit: Int, offset: Int)` - Get transaction history
- `transaction(id: ID!)` - Get specific transaction

**Design Mutation operations**

- `register(input: RegisterInput!)` - User registration
- `login(input: LoginInput!)` - User authentication
- `createAccount(input: CreateAccountInput!)` - Create new account
- `transfer(input: TransferInput!)` - Money transfer between accounts
- `deposit(input: DepositInput!)` - Deposit money
- `withdraw(input: WithdrawInput!)` - Withdraw money


### Step 4: Core Business Logic Implementation

**User management service**

- User registration with document validation
- Password hashing and validation
- User profile management
- Email uniqueness validation

**Account management service**

- Account creation with unique account number generation
- Account balance management with decimal precision
- Account validation rules (minimum balance, etc.)
- Multiple account types support

**Transaction service**

- Money transfer logic with atomicity
- Transaction validation (sufficient funds, valid accounts)
- Balance update mechanisms with database transactions
- Transaction history with pagination
- Idempotency handling using reference_id


### Step 5: Authentication and Security

**Implement JWT authentication**

- User login resolver
- Token generation and validation
- Password encryption using bcrypt
- Refresh token mechanism

**Add GraphQL security measures**

- Authentication middleware for protected resolvers
- Field-level authorization
- Query complexity analysis and limits
- Rate limiting for mutations

**Create security utilities**

- Input validation and sanitization
- SQL injection prevention
- CORS configuration
- Helmet.js for HTTP headers security


### Step 6: GraphQL Resolvers Implementation

**Query resolvers**

- Implement user profile resolver with authentication
- Implement accounts resolver with ownership validation
- Implement transactions resolver with pagination
- Add proper error handling and validation

**Mutation resolvers**

- Implement registration with validation
- Implement login with proper error messages
- Implement account creation with business rules
- Implement transfer with transaction safety

**Data loading optimization**

- Implement DataLoader pattern for N+1 query prevention
- Add database query optimization
- Implement proper caching strategies


### Step 7: Testing Setup

**Unit testing**

- Test business logic services
- Test database operations
- Test utility functions
- Mock external dependencies

**Integration testing**

- Test GraphQL resolvers
- Test database integration
- Test authentication flow
- Test transaction atomicity

**GraphQL testing**

- Test query and mutation operations
- Test schema validation
- Test error handling
- Performance testing for complex queries


### Step 8: Docker and Development Environment

**Create Docker setup**

- Application Dockerfile with multi-stage build
- PostgreSQL service configuration
- Environment variable management
- Volume mounting for development

**Set up Docker Compose**

- Application service with hot reloading
- PostgreSQL service with data persistence
- pgAdmin for database management
- Network configuration between services

**Development workflow**

- Database initialization scripts
- Migration running on startup
- GraphQL playground configuration
- Log aggregation setup


### Step 9: Basic Monitoring and Logging

**Implement structured logging**

- Request/response logging with GraphQL operation names
- Error logging with stack traces
- Business event logging for audit
- Performance metrics logging

**Add health checks**

- Application health endpoint
- Database connection check
- GraphQL schema health
- Docker health check configuration

**Basic monitoring**

- Query performance tracking
- Error rate monitoring
- Database connection pool monitoring
- Memory and CPU usage tracking


## Expected Deliverables

### Functional Requirements Met

- **User Registration and Login**: Working authentication with GraphQL
- **Account Management**: Create and view bank accounts through GraphQL API
- **Money Transfers**: Atomic transaction functionality between accounts
- **Transaction History**: Paginated transaction queries
- **Balance Management**: Real-time balance updates with proper decimal handling


### Technical Deliverables

- Working GraphQL API with complete schema and resolvers
- PostgreSQL database with proper migrations and constraints
- Docker Compose setup for full development environment
- Comprehensive test suite covering resolvers and business logic
- API documentation through GraphQL introspection and schema


## Success Criteria

### Functional Success

- ✅ User can register and login via GraphQL mutations
- ✅ User can create bank accounts with proper validation
- ✅ User can transfer money between accounts atomically
- ✅ All transactions are properly recorded with audit trail
- ✅ Account balances are accurately maintained with decimal precision
- ✅ GraphQL queries return proper data with relationships


### Technical Success

- ✅ All GraphQL operations work correctly
- ✅ Database operations maintain ACID properties
- ✅ Application runs successfully in Docker environment
- ✅ PostgreSQL migrations run successfully
- ✅ Test suite covers all critical functionality
- ✅ GraphQL schema follows best practices


## Common Pitfalls to Avoid

- **GraphQL N+1 queries**: Implement DataLoader from the start
- **Decimal precision**: Use proper decimal types for financial calculations
- **Transaction safety**: Ensure database transactions for money transfers
- **Authentication bypass**: Secure all protected resolvers properly
- **Schema design**: Plan for evolution and backward compatibility


## Next Phase Preparation

### What to Focus On

- Clean GraphQL schema design
- Proper error handling and validation
- Database transaction management
- Authentication and authorization patterns
- Testing GraphQL operations


### Knowledge Gained

By completing Phase 1, you will understand:

- GraphQL API design and implementation
- PostgreSQL modeling for financial applications
- Banking domain and transaction safety
- Docker-based development environment
- Modern authentication patterns
- Testing GraphQL applications

This foundation will be crucial for Phase 2, where we'll introduce event-driven patterns and caching layers.

```flow
flowchart TD
    A[Start Phase 1] --> B{Choose Database}
    B --> C[PostgreSQL for Production Readiness]
    C --> D{API Design}
    D --> E[GraphQL - Modern API Pattern]
    E --> F{Authentication Method}
    F --> G[JWT Token-based Auth]
    G --> H{Application Structure}
    H --> I[Layered Monolith with GraphQL]
    I --> J{Containerization}
    J --> K[Docker Compose with PostgreSQL]
    K --> L[Ready for Development]
System Architecture Diagram
text
graph TB
    subgraph "Banking Monolith Application"
        A[GraphQL API Layer]
        B[Authentication Service]
        C[Account Service]
        D[Transaction Service]
        E[Business Logic Layer]
        F[Data Models/Entities]
    end
    
    G[PostgreSQL Database] --> F
    H[Client Applications] --> A
    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    D --> E
    E --> F

```



