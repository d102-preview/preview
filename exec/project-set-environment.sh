ORIGINAL_DIR=$(pwd)
cd ../backend/d102-api/src/main/resources/ && chmod -R 755 . && cp ${PROD_YML} .

cd ${ORIGINAL_DIR}
cd ../backend/d102-file/src/main/resources/ && chmod -R 755 . && cp ${PROD_YML} .