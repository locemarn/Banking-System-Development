# Phase 2: Add Complexity Gradually - Banking System Development

## Overview

This phase introduces asynchronous patterns, caching layers, and enhanced monitoring to the foundational banking system. We'll maintain the PostgreSQL and GraphQL architecture while adding event-driven communication within the monolith and implementing Redis for performance optimization.

## Phase Objectives

- Introduce event-driven patterns within the monolithic structure
- Implement Redis caching for improved performance
- Add comprehensive logging and basic monitoring
- Enhance security and validation layers
- Implement basic notification system
- Add database optimization and indexing


## Architecture Decision Flow

![Phase 2 - Architecture Decision Flow](./assets/phase2-flow.png)

```
Phase 1 Complete
    ↓
Add Event System Decision
    ↓
In-Memory Event Bus
    ↓
Caching Strategy
    ↓
Single Redis Instance
    ↓
Monitoring Approach
    ↓
Structured Logging + Basic Metrics
    ↓
Notification System
    ↓
Simple Email/SMS Service
    ↓
Database Optimization
    ↓
Advanced Indexing + Query Optimization
    ↓
Enhanced Monolith Ready
```


## System Architecture Diagram

The enhanced banking system architecture introduces several new components while maintaining the monolithic structure:

### **Enhanced Banking Monolith**

**API and Service Layer:**

- **GraphQL API Layer**: Single entry point for all client requests
- **Authentication Service**: Enhanced with session management and security features
- **Account Service**: Improved with event publishing and caching
- **Transaction Service**: Enhanced with event-driven processing

**New Components:**

- **Event Bus (In-Memory)**: Handles asynchronous communication between services
- **Notification Service**: Manages email/SMS notifications
- **Caching Layer**: Redis integration for performance optimization

**Core Infrastructure:**

- **Business Logic Layer**: Central processing with event coordination
- **Data Models/Entities**: Enhanced with audit and event models


### **External Dependencies:**

- **PostgreSQL Database**: Primary data storage
- **Redis Cache**: Performance optimization layer
- **Email/SMS Provider**: External notification delivery
- **Client Applications**: Frontend interfaces


### **Data Flow Architecture:**

![Phase 2 Flow Architecture](./assets/phase2-flow-arch.png)

```
Client Applications
    ↓
GraphQL API Layer
    ├── Authentication Service ──┐
    ├── Account Service ────────┼── Business Logic Layer
    └── Transaction Service ────┘        ↓
                                Event Bus (In-Memory)
                                    ↓
                            Notification Service
                                    ↓
                            Email/SMS Provider

Business Logic Layer ←→ Caching Layer ←→ Redis Cache
        ↓
Data Models/Entities
        ↓
PostgreSQL Database
```
[![](https://mermaid.ink/img/pako:eNplUsuOmzAU_RXLq1YiGSA8BhaVCKBoJIgyQ1Y1WbjggFWwkW3SplH-fQxp0lFnY93HOeeea_sCK14TGMJjx39VLRYK7JOSxRGKO0qYAtEwdLTCinImD2Cx-AY2rxnaCDy0rxmIdi8gw2ciDiXT9bkfFSgaVavJf3mgIOJEK_IRE2tQVfFRT_jc3RdoLzCTuPqPHhVzf51laD1KyoiUIOMNrR4mtPAdUrL9h1gfc5KuUXqaFtMCYAFe2CInPRfnwz9InKEYVy1lzUP23kpylGCFQa4vrZNPqd5RUSI1Il3PgG2BtlzR4-fVtzczabFDaY9p91TkBdgJfqL1PCK-TXiL0RupqQSThYmX5HN9t0FfdlyqRpBCX9Pk4geW5OsBGrARtIahEiMxYE-EVtcpvJQMgBLql-hJCUMd1lj8LGHJrpozYPad8_5OE3xsWhgecSd1Ng41ViShuBG4f1QFYdpqPD0aDC3HnUVgeIG_YWib3nIVrEzPt03LDRzn2YBnjVp5S9sxbccK3GfH9Xz3asA_81xz6Vm-G9i271qO7XmBb0C9uOIiv_3I-WNe3wGQN9TX?type=png)](https://mermaid.live/edit#pako:eNplUsuOmzAU_RXLq1YiGSA8BhaVCKBoJIgyQ1Y1WbjggFWwkW3SplH-fQxp0lFnY93HOeeea_sCK14TGMJjx39VLRYK7JOSxRGKO0qYAtEwdLTCinImD2Cx-AY2rxnaCDy0rxmIdi8gw2ciDiXT9bkfFSgaVavJf3mgIOJEK_IRE2tQVfFRT_jc3RdoLzCTuPqPHhVzf51laD1KyoiUIOMNrR4mtPAdUrL9h1gfc5KuUXqaFtMCYAFe2CInPRfnwz9InKEYVy1lzUP23kpylGCFQa4vrZNPqd5RUSI1Il3PgG2BtlzR4-fVtzczabFDaY9p91TkBdgJfqL1PCK-TXiL0RupqQSThYmX5HN9t0FfdlyqRpBCX9Pk4geW5OsBGrARtIahEiMxYE-EVtcpvJQMgBLql-hJCUMd1lj8LGHJrpozYPad8_5OE3xsWhgecSd1Ng41ViShuBG4f1QFYdpqPD0aDC3HnUVgeIG_YWib3nIVrEzPt03LDRzn2YBnjVp5S9sxbccK3GfH9Xz3asA_81xz6Vm-G9i271qO7XmBb0C9uOIiv_3I-WNe3wGQN9TX)



## Key Architectural Decisions

### Event System: In-Memory Event Bus

**Decision**: Implement in-memory event-driven patterns within the monolith

**Rationale**: Learn async patterns without external message broker complexity

**Trade-off**: Events don't survive restarts but perfect for learning event-driven design

### Caching Strategy: Single Redis Instance

**Decision**: Add Redis for caching frequently accessed data

**Rationale**: Improve API response times, reduce database load

**Trade-off**: Adds infrastructure complexity but significant performance gains

### Monitoring: Structured Logging + Basic Metrics

**Decision**: Enhanced logging with basic performance metrics collection

**Rationale**: Better observability without overwhelming monitoring stack

**Trade-off**: Not production-grade monitoring but sufficient for development phase

### Notification System: Simple External Service Integration

**Decision**: Add email/SMS notifications for banking events

**Rationale**: Complete user experience, learn external service integration

**Trade-off**: Additional dependencies but essential banking feature

## New Database Models

### Event Store Model

```sql
EventStore {
  id: UUID (Primary Key)
  event_type: String (Not Null)
  aggregate_id: UUID (Not Null) // Account ID, User ID, etc.
  aggregate_type: String (Not Null) // 'Account', 'User', 'Transaction'
  event_data: JSONB (Not Null)
  event_version: Integer (Default: 1)
  user_id: UUID (Foreign Key -> User.id, Nullable)
  created_at: Timestamp (Default: now)
}
```


### Notification Model

```sql
Notification {
  id: UUID (Primary Key)
  user_id: UUID (Foreign Key -> User.id)
  type: Enum (EMAIL, SMS, PUSH, IN_APP)
  status: Enum (PENDING, SENT, DELIVERED, FAILED)
  subject: String
  content: Text (Not Null)
  metadata: JSONB (template variables, external IDs)
  scheduled_at: Timestamp (Default: now)
  sent_at: Timestamp (Nullable)
  created_at: Timestamp (Default: now)
  updated_at: Timestamp (Default: now)
}
```


### Audit Log Model (Enhanced)

```sql
AuditLog {
  id: UUID (Primary Key)
  user_id: UUID (Foreign Key -> User.id, Nullable)
  entity_type: String (Not Null) // 'Account', 'Transaction', 'User'
  entity_id: UUID (Not Null)
  action: String (Not Null) // 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'
  old_values: JSONB (Nullable)
  new_values: JSONB (Nullable)
  ip_address: String
  user_agent: String
  created_at: Timestamp (Default: now)
}
```


## Step-by-Step Implementation Instructions

### Step 1: Implement In-Memory Event System

**Create event infrastructure**

- Design event base class/interface with common properties
- Implement event bus with publish/subscribe pattern
- Create event handler registration system
- Add event persistence to EventStore table

**Define banking domain events**

- `UserRegisteredEvent` - New user registration
- `AccountCreatedEvent` - New account creation
- `TransactionInitiatedEvent` - Transaction started
- `TransactionCompletedEvent` - Transaction finished
- `BalanceUpdatedEvent` - Account balance changed

**Implement event handlers**

- Create handlers for notification triggering
- Create handlers for audit log creation
- Create handlers for cache invalidation
- Ensure handlers are idempotent and error-resistant

**Integrate events with existing services**

- Modify user registration to publish events
- Modify transaction service to publish transaction events
- Modify account service to publish balance events
- Add event publishing to GraphQL resolvers


### Step 2: Add Redis Caching Layer

**Set up Redis infrastructure**

- Add Redis service to Docker Compose
- Configure Redis connection with connection pooling
- Set up Redis client with proper error handling
- Configure Redis persistence and memory policies

**Implement caching patterns**

- Cache-Aside pattern for user profiles and account data
- Write-Through pattern for frequently updated balances
- Cache invalidation on relevant events
- TTL strategies for different data types

**Add caching to key operations**

- Cache user profile data (TTL: 1 hour)
- Cache account balances (TTL: 5 minutes)
- Cache transaction history pages (TTL: 10 minutes)
- Cache authentication tokens (TTL: token lifetime)

**Implement cache warming strategies**

- Pre-load frequently accessed accounts on startup
- Background cache refresh for critical data
- Cache miss logging for optimization insights


### Step 3: Enhance GraphQL Schema and Resolvers

**Add new GraphQL types**

- Event type for event store queries
- Notification type with status tracking
- AuditLog type for compliance queries
- Enhanced error types with detailed messages

**Add new query operations**

- `notifications(status: NotificationStatus, limit: Int)` - Get user notifications
- `auditLogs(entityType: String, entityId: ID, limit: Int)` - Get audit trail
- `events(aggregateId: ID, eventType: String)` - Get event history (admin only)

**Add new mutation operations**

- `markNotificationAsRead(id: ID!)` - Mark notification as read
- `resendNotification(id: ID!)` - Resend failed notification
- Enhanced transfer mutation with idempotency keys

**Implement advanced resolver features**

- Add DataLoader for batch loading with caching
- Implement cursor-based pagination for better performance
- Add field-level caching for expensive computations
- Enhanced error handling with proper GraphQL error extensions


### Step 4: Implement Notification System

**Design notification infrastructure**

- Create notification service with template support
- Implement notification queue for async processing
- Add external service integrations (email/SMS providers)
- Create notification template management

**Add notification triggers**

- Welcome email on user registration
- Account creation confirmation
- Transaction confirmation emails/SMS
- Low balance warnings
- Security alerts for sensitive operations

**Implement notification processing**

- Async notification worker using event handlers
- Retry mechanism for failed notifications
- Delivery status tracking and webhooks
- Rate limiting and throttling

**Add notification preferences**

- User preference settings for notification types
- Channel preferences (email vs SMS vs both)
- Notification frequency controls
- Opt-out mechanisms for non-critical notifications


### Step 5: Database Optimization and Indexing

**Add strategic database indexes**

- Composite index on `(user_id, created_at)` for transaction history
- Index on `account_number` for fast account lookups
- Index on `email` for user authentication
- Index on `event_type` and `aggregate_id` for event queries

**Implement database connection optimization**

- Connection pooling with proper sizing
- Query timeout configuration
- Prepared statement caching
- Database connection health monitoring

**Add database performance monitoring**

- Slow query logging and analysis
- Connection pool metrics
- Database lock monitoring
- Query execution plan analysis

**Implement database backup and recovery**

- Automated daily backups
- Point-in-time recovery setup
- Backup verification procedures
- Recovery testing procedures


### Step 6: Enhanced Security and Validation

**Implement advanced authentication features**

- Refresh token rotation
- Session management and concurrent session limits
- Password strength requirements and validation
- Account lockout after failed attempts

**Add comprehensive input validation**

- Custom GraphQL scalar types for banking data (CPF, account numbers)
- Business rule validation at resolver level
- Amount validation with precision checks
- Cross-field validation for complex operations

**Implement audit and compliance features**

- Comprehensive audit logging for all operations
- Data retention policies
- Privacy compliance (LGPD for Brazil)
- Sensitive data masking in logs

**Add security monitoring**

- Failed authentication attempt tracking
- Suspicious activity pattern detection
- Rate limiting per user and IP
- Security event logging and alerting


### Step 7: Comprehensive Logging and Basic Monitoring

**Implement structured logging**

- JSON-based log format with correlation IDs
- Context-aware logging (user, request, transaction)
- Log level management (debug, info, warn, error)
- Sensitive data filtering in logs

**Add application metrics**

- Response time tracking per GraphQL operation
- Error rate monitoring by operation type
- Cache hit/miss ratios
- Database query performance metrics

**Implement health checks and status endpoints**

- Database connectivity health check
- Redis connectivity health check
- External service health checks
- Application memory and CPU monitoring

**Add basic alerting**

- Error rate threshold alerts
- Response time degradation alerts
- Database connection issues
- Cache performance degradation


### Step 8: Testing Enhancements

**Add event-driven testing**

- Test event publishing and handling
- Test event persistence and replay
- Test event handler idempotency
- Integration tests for event-driven flows

**Implement caching tests**

- Test cache hit/miss scenarios
- Test cache invalidation logic
- Test cache warming strategies
- Performance tests with and without caching

**Add notification testing**

- Mock external notification providers
- Test notification template rendering
- Test notification retry mechanisms
- Integration tests for notification flows

**Implement load testing**

- GraphQL query performance under load
- Database performance with concurrent users
- Cache performance under high load
- Event processing under high throughput


### Step 9: Docker and Development Environment Enhancements

**Enhance Docker Compose setup**

- Add Redis service with persistence
- Add development tools (Redis Commander, pgAdmin)
- Configure service dependencies and health checks
- Add volume mounts for development data

**Implement development tools**

- Database migration tools
- Cache management utilities
- Event replay tools for testing
- Log aggregation for development

**Add environment management**

- Multiple environment configurations (dev, test, staging)
- Environment-specific feature flags
- Configuration validation on startup
- Secrets management for external services


## Expected Deliverables

### Functional Requirements Met

- **Event-Driven Architecture**: Working in-memory event system with domain events
- **Caching Layer**: Redis integration with performance improvements
- **Notification System**: Email and SMS notifications for banking events
- **Enhanced Security**: Advanced authentication and comprehensive audit trails
- **Database Optimization**: Improved query performance and proper indexing


### Technical Deliverables

- Enhanced GraphQL API with caching and advanced features
- Event sourcing foundation with event store and replay capabilities
- Redis caching implementation with proper invalidation strategies
- Notification service with external provider integration
- Comprehensive monitoring with structured logging and metrics
- Optimized database with strategic indexing and performance monitoring


## Success Criteria

### Performance Success

- ✅ API response times improved by 50% with caching
- ✅ Database query times under 50ms for cached operations
- ✅ Event processing latency under 10ms for in-memory events
- ✅ Cache hit ratio above 80% for frequently accessed data


### Functional Success

- ✅ All banking events properly published and handled
- ✅ Notifications sent successfully for all banking operations
- ✅ Comprehensive audit trail for all user actions
- ✅ Advanced authentication features working correctly
- ✅ Database performance optimized for concurrent users


### Technical Success

- ✅ Event system handles failures gracefully
- ✅ Redis integration stable under load
- ✅ Monitoring provides actionable insights
- ✅ All tests pass including new event-driven tests
- ✅ Docker environment includes all new services


## Common Pitfalls to Avoid

- **Event Handler Failures**: Implement proper error handling and retry mechanisms
- **Cache Invalidation**: Ensure cache consistency with database updates
- **Notification Spam**: Implement proper rate limiting and user preferences
- **Memory Leaks**: Monitor in-memory event bus for memory growth
- **Database Lock Contention**: Optimize transaction scope and duration


## Next Phase Preparation

### What to Focus On

- Event-driven patterns and async processing
- Caching strategies and performance optimization
- External service integration and error handling
- Monitoring and observability best practices
- Database performance and optimization


### Knowledge Gained

By completing Phase 2, you will understand:

- Event-driven architecture within monoliths
- Caching patterns and Redis integration
- External service integration and error handling
- Performance monitoring and optimization
- Database indexing and query optimization
- Comprehensive audit and compliance patterns

This enhanced foundation will be crucial for **Phase 3**, where we'll refactor into a truly modular monolith with better separation of concerns and more sophisticated architectural patterns.

