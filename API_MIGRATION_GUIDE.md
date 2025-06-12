# API Structure Migration Guide

This guide will help you migrate the current flat module structure to the new web/mobile separated structure with shared modules.

## New Structure

```
/modules/v1/
  /web/
    /mock-register/
    /ielts-register/
    /survey/
    /event/
    /story/
    /...
  /mobile/
    /mock-register/
    /ielts-register/
    /survey/
    /event/
    /story/
    /...
  /shared/
    /redis/
    /branch/
    /city/
    /external/
    /auth/
    /...
```

## Migration Steps

### 1. Using the Migration Script

We've created a migration script to help you set up the basic structure for each module. Run it for each module you want to migrate:

```bash
./migrate-module.sh <module_name>
```

For example:

```bash
./migrate-module.sh ielts-register
```

### 2. Update Controller Files

You'll need to manually create or update controller files for web and mobile:

#### Web Controller Template

```typescript
// <module-name>.controller.ts
import { Controller, Get, Post, Body, Put, Req, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetOne, ApiCreate, ApiUpdate, ApiDelete } from 'src/common/swagger/common-swagger';
import { <ModuleName>Service } from '../service/<module-name>.service';
// Import your DTOs here

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('<Module Name> - Web')
@Controller('<module-name>/web')
export class <ModuleName>Controller {
    constructor(private readonly <moduleName>Service: <ModuleName>Service) {}

    // Implement your endpoints here
}
```

#### Mobile Controller Template

```typescript
// <module-name>.controller.ts
import { Controller, Get, Post, Body, Req, Param, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtHttpAuthGuard } from 'src/common/guards/auth/http-auth.guard';
import { CustomRequest } from 'src/common/types/types';
import { CommonEntity } from 'src/common/libs/common.entity';
import { ApiAuth, ApiGetOne, ApiGetAll } from 'src/common/swagger/common-swagger';
import { <ModuleName>Service } from '../service/<module-name>.service';
// Import your DTOs here

@UseGuards(JwtHttpAuthGuard)
@ApiAuth()
@ApiTags('<Module Name> - Mobile')
@Controller('<module-name>/mobile')
export class <ModuleName>Controller {
    constructor(private readonly <moduleName>Service: <ModuleName>Service) {}

    // Implement your endpoints here
}
```

### 3. Update Parent Modules

Update the web.module.ts and mobile.module.ts files to include your new modules:

```typescript
// web.module.ts
import { Module } from '@nestjs/common';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { IeltsRegisterModule } from './ielts-register/ielts-register.module';
import { SurveyModule } from './survey/survey.module';
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';
// Import other modules as needed

@Module({
    imports: [
        MockRegisterModule,
        IeltsRegisterModule,
        SurveyModule,
        EventModule,
        StoryModule,
        // Add other modules here
    ],
    exports: [
        MockRegisterModule,
        IeltsRegisterModule,
        // Export other modules here
    ],
})
export class WebModule {}
```

```typescript
// mobile.module.ts
import { Module } from '@nestjs/common';
import { MockRegisterModule } from './mock-register/mock-register.module';
import { IeltsRegisterModule } from './ielts-register/ielts-register.module';
import { SurveyModule } from './survey/survey.module';
import { EventModule } from './event/event.module';
import { StoryModule } from './story/story.module';
// Import other modules as needed

@Module({
    imports: [
        MockRegisterModule,
        IeltsRegisterModule,
        SurveyModule,
        EventModule,
        StoryModule,
        SurveyModule,
        EventModule,
        StoryModule,
        // Add other modules here
    ],
    exports: [
        MockRegisterModule,
        IeltsRegisterModule,
        SurveyModule,
        EventModule,
        StoryModule,
        // Export other modules here
    ],
})
export class MobileModule {}
```

### 4. Shared Modules

Modules that are common between web and mobile interfaces are placed in the `/shared` directory. These include:

- **Redis Module**: For caching and session management
- **Branch Module**: For branch-related functionality
- **City Module**: For city-related functionality
- **External Module**: For external API integrations
- **Auth Module**: For authentication-related functionality
- **Auth Module**: For authentication-related functionality

To use a shared module:

1. Import the `SharedModule` in your module:

```typescript
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [
        SharedModule,
        // Other imports
    ],
    // Rest of module definition
})
export class YourModule {}
```

2. Inject the services from shared modules in your services:

```typescript
import { Injectable } from '@nestjs/common';
import { RedisService } from '../../shared/redis/redis.service';

@Injectable()
export class YourService {
    constructor(
        private readonly redisService: RedisService,
        // Other dependencies
    ) {}
    
    // Your service methods
}
```

### 5. Testing

After migrating each module:

1. Ensure all imports are correctly updated to reflect the new paths
2. Check that Swagger documentation is generating correctly
3. Test both the web and mobile endpoints to ensure they work as expected

## Best Practices

1. **Different DTOs**: Consider creating specific DTOs for mobile if they need to be different from web
2. **Shared Code**: Use the service layer to share business logic between web and mobile
3. **Route Naming**: Keep route naming consistent across all modules
4. **Documentation**: Update Swagger documentation to clearly differentiate between web and mobile APIs

## Handling Common Code

If you have code that's shared between web and mobile, consider:

1. Creating a common module that both web and mobile can import
2. Using inheritance for controllers where it makes sense
3. Creating shared utilities for common functionality

## Migration Progress

The following modules have been successfully migrated:

1. **mock-register**: Complete with web and mobile versions
2. **survey**: Complete with web and mobile versions
3. **event**: Complete with web and mobile versions 
4. **story**: Complete with web and mobile versions

Modules still to be migrated:

1. **ielts-register**
2. **branch**
3. **city**
4. Others as identified in the application

### Key Differences between Web and Mobile Implementations

1. **Mobile endpoints** - Simplified, focused on client-side needs:
   - Limited to essential operations (GET, POST)
   - Always filter for published content
   - Simplify DTOs to only include necessary fields

2. **Web endpoints** - Full-featured, admin-focused:
   - Complete CRUD operations
   - Access to all status types (DRAFT, PUBLISHED, etc.)
   - Extended DTOs with admin fields (commentAdmin, etc.)

3. **Error handling** - Both implementations use modern error handling with:
   - `firstValueFrom` instead of deprecated `.toPromise()`
   - Proper timeout and error handling with RxJS operators
