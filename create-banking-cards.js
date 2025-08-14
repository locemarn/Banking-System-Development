const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

const bankingSystemTasks = {
  "phase-1": [
    // Database & Setup
    {
      title: "[Database] Setup PostgreSQL with Docker Compose",
      body: `## Objective
Create Docker Compose configuration for PostgreSQL database with proper initialization scripts

## Acceptance Criteria
- [ ] PostgreSQL service added to docker-compose.yml
- [ ] Database initialization scripts created
- [ ] Connection parameters configured
- [ ] Database persistence configured with volumes

## Technical Notes
- Dependencies: Docker, Docker Compose
- Estimated effort: Medium
- Phase: 1

## Definition of Done
- [ ] PostgreSQL running in Docker
- [ ] Database accessible from application
- [ ] Tests verify database connection
- [ ] Documentation updated`,
      labels: ["phase-1", "database", "setup", "medium"]
    },
    {
      title: "[Models] Create User model with validation",
      body: `## Objective
Implement User model with email, password hash, document validation, and security features

## Acceptance Criteria
- [ ] User table created with proper constraints
- [ ] Email uniqueness validation implemented
- [ ] Document number (CPF) validation added
- [ ] Password hashing with bcrypt
- [ ] User status and timestamps

## Technical Notes
- Dependencies: PostgreSQL setup
- Estimated effort: Medium
- Phase: 1

## Definition of Done
- [ ] User model implemented
- [ ] Validation rules working
- [ ] Unit tests written
- [ ] Migration created`,
      labels: ["phase-1", "database", "models", "medium"]
    },
    {
      title: "[Models] Create Account model with business constraints",
      body: `## Objective
Implement Account model with balance management, account types, and business rules

## Acceptance Criteria
- [ ] Account table with foreign key to User
- [ ] Balance field with proper decimal precision
- [ ] Account types enum (CHECKING, SAVINGS, INVESTMENT)
- [ ] Unique account number generation
- [ ] Currency and status fields

## Technical Notes
- Dependencies: User model completed
- Estimated effort: Medium
- Phase: 1`,
      labels: ["phase-1", "database", "models", "medium"]
    },
    {
      title: "[Models] Create Transaction model with audit trail",
      body: `## Objective
Implement Transaction model for money transfers with comprehensive audit capabilities

## Acceptance Criteria
- [ ] Transaction table with from/to account relationships
- [ ] Amount with proper decimal precision
- [ ] Transaction types and status enums
- [ ] Reference ID for idempotency
- [ ] Metadata JSONB field for additional data

## Technical Notes
- Dependencies: Account model completed
- Estimated effort: Large
- Phase: 1`,
      labels: ["phase-1", "database", "models", "large"]
    },
    {
      title: "[Models] Create TransactionLog model for compliance",
      body: `## Objective
Implement TransactionLog model for audit trail and compliance requirements

## Acceptance Criteria
- [ ] TransactionLog table with foreign key to Transaction
- [ ] Status change tracking
- [ ] User attribution for changes
- [ ] Change reason documentation
- [ ] Immutable audit trail

## Technical Notes
- Dependencies: Transaction model completed
- Estimated effort: Small
- Phase: 1`,
      labels: ["phase-1", "database", "models", "small"]
    },
    // GraphQL API
    {
      title: "[GraphQL] Design User, Account, Transaction schema",
      body: `## Objective
Create comprehensive GraphQL schema for all core banking entities

## Acceptance Criteria
- [ ] User type with secure field exposure
- [ ] Account type with balance protection
- [ ] Transaction type with proper relationships
- [ ] Input types for mutations defined
- [ ] Schema validation implemented

## Technical Notes
- Dependencies: Database models completed
- Estimated effort: Large
- Phase: 1`,
      labels: ["phase-1", "graphql", "api", "large"]
    },
    {
      title: "[GraphQL] Implement User registration/login resolvers",
      body: `## Objective
Create GraphQL resolvers for user registration and authentication

## Acceptance Criteria
- [ ] Register mutation with validation
- [ ] Login mutation with JWT token generation
- [ ] User profile query with authentication
- [ ] Password validation and hashing
- [ ] Error handling for invalid credentials

## Technical Notes
- Dependencies: GraphQL schema, User model
- Estimated effort: Large
- Phase: 1`,
      labels: ["phase-1", "graphql", "authentication", "large"]
    },
    {
      title: "[GraphQL] Implement Account management resolvers",
      body: `## Objective
Create GraphQL resolvers for account creation and management

## Acceptance Criteria
- [ ] CreateAccount mutation with validation
- [ ] Accounts query with user ownership validation
- [ ] Account balance queries with security
- [ ] Account status management
- [ ] Business rule validation

## Technical Notes
- Dependencies: Account model, Authentication
- Estimated effort: Medium
- Phase: 1`,
      labels: ["phase-1", "graphql", "accounts", "medium"]
    },
    {
      title: "[GraphQL] Implement Transaction processing resolvers",
      body: `## Objective
Create GraphQL resolvers for transaction processing and history

## Acceptance Criteria
- [ ] Transfer mutation with atomicity
- [ ] Deposit and withdrawal mutations
- [ ] Transaction history queries with pagination
- [ ] Balance validation before transactions
- [ ] Idempotency handling with reference_id

## Technical Notes
- Dependencies: Transaction model, Account resolvers
- Estimated effort: Large
- Phase: 1`,
      labels: ["phase-1", "graphql", "transactions", "large"]
    },
    // Authentication & Security
    {
      title: "[Auth] Implement JWT token authentication",
      body: `## Objective
Create JWT authentication system with secure token generation and validation

## Acceptance Criteria
- [ ] JWT token generation on login
- [ ] Token validation middleware
- [ ] Refresh token mechanism
- [ ] Token expiration handling
- [ ] Secure token storage guidelines

## Technical Notes
- Dependencies: User model
- Estimated effort: Medium
- Phase: 1`,
      labels: ["phase-1", "authentication", "security", "medium"]
    },
    {
      title: "[Security] Add password hashing with bcrypt",
      body: `## Objective
Implement secure password hashing using bcrypt

## Acceptance Criteria
- [ ] Password hashing on user registration
- [ ] Password comparison for login
- [ ] Configurable salt rounds
- [ ] Password strength validation
- [ ] Security best practices followed

## Technical Notes
- Dependencies: User model
- Estimated effort: Small
- Phase: 1`,
      labels: ["phase-1", "security", "authentication", "small"]
    },
    {
      title: "[Security] Create authentication middleware",
      body: `## Objective
Implement middleware for protecting GraphQL resolvers

## Acceptance Criteria
- [ ] JWT token extraction from headers
- [ ] Token validation and decoding
- [ ] User context injection
- [ ] Error handling for invalid tokens
- [ ] Protection for sensitive resolvers

## Technical Notes
- Dependencies: JWT implementation
- Estimated effort: Medium
- Phase: 1`,
      labels: ["phase-1", "security", "middleware", "medium"]
    },
    // Testing & Documentation
    {
      title: "[Testing] Write unit tests for business logic",
      body: `## Objective
Create comprehensive unit tests for all business logic services

## Acceptance Criteria
- [ ] User service tests with mocked database
- [ ] Account service tests with validation
- [ ] Transaction service tests with atomicity
- [ ] Utility function tests
- [ ] 80%+ code coverage

## Technical Notes
- Dependencies: All services implemented
- Estimated effort: Large
- Phase: 1`,
      labels: ["phase-1", "testing", "unit-tests", "large"]
    },
    {
      title: "[Testing] Create integration tests for GraphQL resolvers",
      body: `## Objective
Create integration tests for all GraphQL resolvers with database

## Acceptance Criteria
- [ ] User registration and login flow tests
- [ ] Account creation and management tests
- [ ] Transaction processing tests
- [ ] Error handling tests
- [ ] Database state validation

## Technical Notes
- Dependencies: All GraphQL resolvers
- Estimated effort: Large
- Phase: 1`,
      labels: ["phase-1", "testing", "integration", "large"]
    },
    {
      title: "[Documentation] Create API documentation",
      body: `## Objective
Generate comprehensive API documentation from GraphQL schema

## Acceptance Criteria
- [ ] GraphQL Playground configured
- [ ] Schema introspection enabled
- [ ] Query examples documented
- [ ] Authentication flow documented
- [ ] Error codes and responses documented

## Technical Notes
- Dependencies: Complete GraphQL API
- Estimated effort: Medium
- Phase: 1`,
      labels: ["phase-1", "documentation", "api", "medium"]
    }
  ],

  "phase-2": [
    // Event System
    {
      title: "[Events] Implement in-memory event bus",
      body: `## Objective
Create event bus with publish/subscribe pattern for domain events

## Acceptance Criteria
- [ ] Event base class/interface created
- [ ] Event bus with publisher/subscriber pattern
- [ ] Event handler registration system
- [ ] Event persistence to EventStore table
- [ ] Error handling for failed handlers

## Technical Notes
- Dependencies: EventStore model
- Estimated effort: Large
- Phase: 2`,
      labels: ["phase-2", "events", "architecture", "large"]
    },
    {
      title: "[Events] Create domain events (UserRegistered, AccountCreated, etc.)",
      body: `## Objective
Define all banking domain events with proper data structures

## Acceptance Criteria
- [ ] UserRegisteredEvent with user data
- [ ] AccountCreatedEvent with account info
- [ ] TransactionInitiatedEvent for transaction start
- [ ] TransactionCompletedEvent for completion
- [ ] BalanceUpdatedEvent for balance changes

## Technical Notes
- Dependencies: Event bus implementation
- Estimated effort: Medium
- Phase: 2`,
      labels: ["phase-2", "events", "domain", "medium"]
    },
    {
      title: "[Events] Add event handlers for notifications",
      body: `## Objective
Create event handlers that trigger notifications for business events

## Acceptance Criteria
- [ ] Welcome email on UserRegistered
- [ ] Account confirmation on AccountCreated
- [ ] Transaction alerts on TransactionCompleted
- [ ] Low balance warnings on BalanceUpdated
- [ ] Idempotent handler implementation

## Technical Notes
- Dependencies: Domain events, Notification service
- Estimated effort: Medium
- Phase: 2`,
      labels: ["phase-2", "events", "notifications", "medium"]
    },
    // Caching Layer
    {
      title: "[Cache] Set up Redis with Docker Compose",
      body: `## Objective
Add Redis service to Docker Compose and configure connection pooling

## Acceptance Criteria
- [ ] Redis service added to docker-compose.yml
- [ ] Redis client configuration with connection pooling
- [ ] Proper error handling for Redis failures
- [ ] Redis persistence configuration
- [ ] Memory policies configured

## Technical Notes
- Dependencies: Docker Compose setup
- Estimated effort: Medium
- Phase: 2`,
      labels: ["phase-2", "cache", "redis", "medium"]
    },
    {
      title: "[Cache] Implement cache-aside pattern for user profiles",
      body: `## Objective
Add caching for user profile data with proper invalidation

## Acceptance Criteria
- [ ] Cache user profile on first access
- [ ] TTL set to 1 hour for user data
- [ ] Cache invalidation on user updates
- [ ] Fallback to database on cache miss
- [ ] Cache performance monitoring

## Technical Notes
- Dependencies: Redis setup, User service
- Estimated effort: Medium
- Phase: 2`,
      labels: ["phase-2", "cache", "user-profiles", "medium"]
    },
    {
      title: "[Cache] Add caching for account balances",
      body: `## Objective
Implement write-through caching for frequently updated account balances

## Acceptance Criteria
- [ ] Cache account balances with 5-minute TTL
- [ ] Write-through pattern for balance updates
- [ ] Cache warming for frequently accessed accounts
- [ ] Cache invalidation on transactions
- [ ] Performance metrics collection

## Technical Notes
- Dependencies: Redis setup, Account service
- Estimated effort: Medium
- Phase: 2`,
      labels: ["phase-2", "cache", "balances", "medium"]
    },
    // Notifications
    {
      title: "[Notification] Design notification service architecture",
      body: `## Objective
Create notification service with template support and multi-channel delivery

## Acceptance Criteria
- [ ] Notification service with queue processing
- [ ] Template management system
- [ ] Multi-channel support (email, SMS)
- [ ] Delivery status tracking
- [ ] Retry mechanism for failures

## Technical Notes
- Dependencies: Event system
- Estimated effort: Large
- Phase: 2`,
      labels: ["phase-2", "notifications", "architecture", "large"]
    },
    {
      title: "[Notification] Implement email notification integration",
      body: `## Objective
Integrate with external email service provider for email notifications

## Acceptance Criteria
- [ ] Email service provider integration (SendGrid/AWS SES)
- [ ] Email template rendering
- [ ] HTML and text email support
- [ ] Delivery webhooks handling
- [ ] Rate limiting and throttling

## Technical Notes
- Dependencies: Notification service
- Estimated effort: Medium
- Phase: 2`,
      labels: ["phase-2", "notifications", "email", "medium"]
    }
  ],

  "phase-3": [
    // Architecture Refactoring
    {
      title: "[Architecture] Refactor into Authentication module",
      body: `## Objective
Extract authentication logic into separate module with clear boundaries

## Acceptance Criteria
- [ ] Authentication module directory structure
- [ ] Module interface and contracts defined
- [ ] Dependency injection configured
- [ ] Public API clearly defined
- [ ] Module health checks implemented

## Technical Notes
- Dependencies: Existing auth code
- Estimated effort: Large
- Phase: 3`,
      labels: ["phase-3", "architecture", "modules", "large"]
    },
    {
      title: "[Architecture] Create Account module with boundaries",
      body: `## Objective
Extract account management into separate module following DDD principles

## Acceptance Criteria
- [ ] Account module with repository pattern
- [ ] Domain services for business logic
- [ ] Module-specific GraphQL schema
- [ ] Clear data ownership boundaries
- [ ] Inter-module communication via events

## Technical Notes
- Dependencies: Module architecture
- Estimated effort: Large
- Phase: 3`,
      labels: ["phase-3", "architecture", "accounts", "large"]
    },
    // RabbitMQ Integration
    {
      title: "[Message Queue] Set up RabbitMQ cluster",
      body: `## Objective
Replace in-memory events with persistent RabbitMQ message broker

## Acceptance Criteria
- [ ] RabbitMQ service in Docker Compose
- [ ] Exchanges, queues, and routing keys configured
- [ ] Dead letter queues for failed messages
- [ ] Message persistence and durability
- [ ] High availability configuration

## Technical Notes
- Dependencies: Docker Compose
- Estimated effort: Large
- Phase: 3`,
      labels: ["phase-3", "messaging", "rabbitmq", "large"]
    },
    // Monitoring
    {
      title: "[Monitoring] Set up Prometheus monitoring",
      body: `## Objective
Implement production-grade metrics collection with Prometheus

## Acceptance Criteria
- [ ] Prometheus service in Docker Compose
- [ ] Custom metrics for each module
- [ ] Service discovery for metric endpoints
- [ ] Metric retention and storage configuration
- [ ] Alert rule configuration

## Technical Notes
- Dependencies: Modular architecture
- Estimated effort: Large
- Phase: 3`,
      labels: ["phase-3", "monitoring", "prometheus", "large"]
    }
  ],

  "phase-4": [
    // Security Enhancement
    {
      title: "[Security] Implement OAuth 2.0 authorization server",
      body: `## Objective
Add enterprise-grade OAuth 2.0 authorization capabilities

## Acceptance Criteria
- [ ] OAuth 2.0 authorization server implementation
- [ ] PKCE support for mobile clients
- [ ] Client registration and management
- [ ] Scope-based authorization
- [ ] OpenID Connect compliance

## Technical Notes
- Dependencies: Existing auth system
- Estimated effort: Large
- Phase: 4`,
      labels: ["phase-4", "security", "oauth", "large"]
    },
    {
      title: "[Security] Add multi-factor authentication",
      body: `## Objective
Implement MFA with TOTP, SMS, and biometric support

## Acceptance Criteria
- [ ] TOTP (Time-based One-Time Password) support
- [ ] SMS verification integration
- [ ] Biometric authentication support
- [ ] MFA enrollment and management
- [ ] Backup codes for recovery

## Technical Notes
- Dependencies: OAuth 2.0 implementation
- Estimated effort: Large
- Phase: 4`,
      labels: ["phase-4", "security", "mfa", "large"]
    },
    // Compliance
    {
      title: "[Compliance] Add Brazilian banking regulation compliance",
      body: `## Objective
Implement full compliance with Central Bank of Brazil regulations

## Acceptance Criteria
- [ ] BACEN transaction reporting
- [ ] Anti-money laundering (AML) checks
- [ ] Customer due diligence (CDD) procedures
- [ ] PEP (Politically Exposed Person) screening
- [ ] Automated regulatory reporting

## Technical Notes
- Dependencies: Complete transaction system
- Estimated effort: Large
- Phase: 4`,
      labels: ["phase-4", "compliance", "banking", "large"]
    },
    // DevOps & Deployment
    {
      title: "[DevOps] Implement CI/CD pipeline with security scanning",
      body: `## Objective
Create comprehensive CI/CD pipeline with security and quality gates

## Acceptance Criteria
- [ ] Multi-stage pipeline with security scanning
- [ ] Automated dependency vulnerability scanning
- [ ] Code quality gates and reviews
- [ ] Automated penetration testing integration
- [ ] Deployment approval workflows

## Technical Notes
- Dependencies: Complete application
- Estimated effort: Large
- Phase: 4`,
      labels: ["phase-4", "devops", "cicd", "large"]
    },
    {
      title: "[DevOps] Set up blue-green deployment",
      body: `## Objective
Implement zero-downtime deployment with blue-green strategy

## Acceptance Criteria
- [ ] Blue-green deployment infrastructure
- [ ] Automated testing in green environment
- [ ] Traffic switching mechanism
- [ ] Automated rollback capabilities
- [ ] Health checks and monitoring

## Technical Notes
- Dependencies: CI/CD pipeline
- Estimated effort: Large
- Phase: 4`,
      labels: ["phase-4", "devops", "deployment", "large"]
    }
  ]
};

async function createIssues() {
  console.log("🚀 Creating Banking System Development Cards...\n");
  
  let totalCreated = 0;
  
  for (const [phase, tasks] of Object.entries(bankingSystemTasks)) {
    console.log(`📋 Creating ${tasks.length} cards for ${phase}...`);
    
    for (const task of tasks) {
      try {
        await octokit.rest.issues.create({
          owner: 'locemarn',
          repo: 'Banking-System-Development',
          title: task.title,
          body: task.body,
          labels: task.labels
        });
        
        console.log(`✅ Created: ${task.title}`);
        totalCreated++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`❌ Failed to create: ${task.title}`, error.message);
      }
    }
    
    console.log(`✨ Completed ${phase}\n`);
  }
  
  console.log(`🎉 Successfully created ${totalCreated} banking system cards!`);
  console.log("📊 Now go to your repository's Issues tab to see all created cards.");
  console.log("🔄 Next step: Set up your GitHub Project board to organize these cards.");
}

// Execute the script
createIssues().catch(console.error);
