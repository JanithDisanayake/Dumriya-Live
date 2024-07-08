# Use the official AWS Lambda Node.js base image
FROM amazon/aws-lambda-nodejs

# Define build arguments
ARG ENVIRONMENT
ARG SECRET_KEY
ARG MONGODB_URI

# Copy function code
COPY package*.json ${LAMBDA_TASK_ROOT}/
RUN npm install

# Copy rest of the application code
COPY . ${LAMBDA_TASK_ROOT}

# Set environment variable
ENV ENVIRONMENT=${ENVIRONMENT}
ENV SECRET_KEY=${SECRET_KEY}
ENV MONGODB_URI=${MONGODB_URI}

# Command to run the Lambda function
CMD ["app.handler"]
