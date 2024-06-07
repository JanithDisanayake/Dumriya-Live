# Use the official AWS Lambda Node.js base image
FROM amazon/aws-lambda-nodejs

# Copy function code
COPY package*.json ${LAMBDA_TASK_ROOT}
COPY node_modules ${LAMBDA_TASK_ROOT}
COPY app.js ${LAMBDA_TASK_ROOT}
RUN npm install

# Command to run the Lambda function
CMD ["app.handler"]
