#!/bin/bash

# Script to update import paths for shared modules

echo "Updating import paths for shared modules..."

# Find all TypeScript files in the project
find /Users/user/Coding/registon/apps/gateway/src -name "*.ts" -type f | while read -r file; do
    # Skip files in the shared directory itself
    if [[ $file == *"/modules/v1/shared/"* ]]; then
        continue
    fi
    
    # Update Redis module imports
    sed -i '' 's|from "../redis/redis.module"|from "../shared/redis/redis.module"|g' "$file"
    sed -i '' 's|from "../redis/redis.service"|from "../shared/redis/redis.service"|g' "$file"
    
    # Update Branch module imports
    sed -i '' 's|from "../branch/branch.module"|from "../shared/branch/branch.module"|g' "$file"
    sed -i '' 's|from "../branch/branch.service"|from "../shared/branch/branch.service"|g' "$file"
    sed -i '' 's|from "../branch/entity/branch-response.entity"|from "../shared/branch/entity/branch-response.entity"|g' "$file"
    
    # Update City module imports
    sed -i '' 's|from "../city/city.module"|from "../shared/city/city.module"|g' "$file"
    sed -i '' 's|from "../city/service/city.service"|from "../shared/city/service/city.service"|g' "$file"
    
    # Update External module imports
    sed -i '' 's|from "../external/external.module"|from "../shared/external/external.module"|g' "$file"
    sed -i '' 's|from "../external/external.service"|from "../shared/external/external.service"|g' "$file"
done

echo "Import paths updated successfully!"
