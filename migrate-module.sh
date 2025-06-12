#!/bin/bash
# Script to migrate a module to the new structure

# Check if all required arguments are provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <module_name>"
    echo "Example: $0 ielts-register"
    exit 1
fi

MODULE_NAME=$1
BASE_PATH="/Users/user/Coding/registon/apps/gateway/src/modules/v1"
SOURCE_PATH="$BASE_PATH/$MODULE_NAME"
WEB_PATH="$BASE_PATH/web/$MODULE_NAME"
MOBILE_PATH="$BASE_PATH/mobile/$MODULE_NAME"

# Check if source module exists
if [ ! -d "$SOURCE_PATH" ]; then
    echo "Error: Module '$MODULE_NAME' not found at $SOURCE_PATH"
    exit 1
fi

# Create directory structure
echo "Creating directory structure..."
mkdir -p "$WEB_PATH/controller" "$WEB_PATH/dto" "$WEB_PATH/service"
mkdir -p "$MOBILE_PATH/controller" "$MOBILE_PATH/dto" "$MOBILE_PATH/service"

# Copy service files
echo "Copying service files..."
if [ -d "$SOURCE_PATH/service" ]; then
    cp -r "$SOURCE_PATH/service/"* "$WEB_PATH/service/"
    cp -r "$SOURCE_PATH/service/"* "$MOBILE_PATH/service/"
fi

# Copy DTO files
echo "Copying DTO files..."
if [ -d "$SOURCE_PATH/dto" ]; then
    cp -r "$SOURCE_PATH/dto/"* "$WEB_PATH/dto/"
    cp -r "$SOURCE_PATH/dto/"* "$MOBILE_PATH/dto/"
fi

# Create module files
echo "Creating module files..."
cat > "$WEB_PATH/${MODULE_NAME}.module.ts" << EOF
// ${MODULE_NAME}.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { ${MODULE_NAME}Controller } from './controller/${MODULE_NAME}.controller';
import { ${MODULE_NAME}Service } from './service/${MODULE_NAME}.service';

@Module({
    imports: [CommunityService],
    controllers: [${MODULE_NAME}Controller],
    providers: [${MODULE_NAME}Service],
    exports: [${MODULE_NAME}Service],
})
export class ${MODULE_NAME}Module {}
EOF

cat > "$MOBILE_PATH/${MODULE_NAME}.module.ts" << EOF
// ${MODULE_NAME}.module.ts
import { Module } from '@nestjs/common';
import { CommunityService } from 'src/microservices';
import { ${MODULE_NAME}Controller } from './controller/${MODULE_NAME}.controller';
import { ${MODULE_NAME}Service } from './service/${MODULE_NAME}.service';

@Module({
    imports: [CommunityService],
    controllers: [${MODULE_NAME}Controller],
    providers: [${MODULE_NAME}Service],
    exports: [${MODULE_NAME}Service],
})
export class ${MODULE_NAME}Module {}
EOF

echo "Module migration template created for $MODULE_NAME."
echo "Next steps:"
echo "1. Update controller files to match the new structure"
echo "2. Update imports in all files to reflect the new paths"
echo "3. Update web.module.ts and mobile.module.ts to import the new module"
echo "4. Test the application to ensure everything works correctly"
