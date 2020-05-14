"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Job config test data.
 */
exports.testJobConfig = {
    contributor: 'OpenPAI',
    description: '# Serving a TensorFlow MNIST Digit Recognition Model\n' +
        'This example shows you how to use TensorFlow Serving components to export a trained TensorFlow model\n' +
        'and use the standard tensorflow_model_server to serve it on OpenPAI.\n' +
        // tslint:disable-next-line:max-line-length
        'This example uses the simple Softmax Regression model introduced in the TensorFlow tutorial for handwritten image (MNIST data) classification.\n' +
        'Reference https://www.tensorflow.org/tfx/serving/serving_basic.\n',
    name: 'sdk_test_job',
    parameters: {
        modelPath: '/tmp/mnist_model'
    },
    prerequisites: [
        {
            contributor: 'OpenPAI',
            // tslint:disable-next-line:max-line-length
            description: 'This is an [example TensorFlow Serving Docker image on OpenPAI](https://github.com/Microsoft/pai/tree/master/examples/serving).\n',
            name: 'tf_serving_example',
            protocolVersion: 2,
            type: 'dockerimage',
            uri: 'openpai/pai.example.tensorflow-serving',
            version: '1.0-r1.4'
        }
    ],
    protocolVersion: 2,
    taskRoles: {
        worker: {
            commands: [
                'bazel-bin/tensorflow_serving/example/mnist_saved_model <% $parameters.modelPath %>',
                // tslint:disable-next-line:max-line-length
                'tensorflow_model_server --port=$PAI_CONTAINER_HOST_model_server_PORT_LIST --model_name=mnist --model_base_path=<% $parameters.modelPath %>'
            ],
            dockerImage: 'tf_serving_example',
            instances: 1,
            resourcePerInstance: {
                cpu: 4,
                gpu: 1,
                memoryMB: 8192,
                ports: {
                    model_server: 1
                }
            }
        }
    },
    type: 'job',
    version: '1.0'
};
exports.testJobConfigV1 = {
    // Name for the job, need to be unique
    jobName: 'test_job_20190819',
    // URL pointing to the Docker image for all tasks in the job
    image: 'aiplatform/pai.build.base',
    // Code directory existing on HDFS.
    // Full HDFS path will be exported as an environment variable $PAI_CODE_DIR.
    codeDir: '$PAI_DEFAULT_FS_URI/$PAI_USER_NAME/$PAI_JOB_NAME',
    // Data directory existing on HDFS.
    // Full HDFS path will be exported as an environment variable $PAI_DATA_DIR.
    dataDir: '$PAI_DEFAULT_FS_URI/Data/$PAI_JOB_NAME',
    // Output directory on HDFS, $PAI_DEFAULT_FS_URI/Output/$jobName will be used if
    // not specified.
    // Full HDFS path will be exported as an environment variable $PAI_OUTPUT_DIR.
    outputDir: '$PAI_DEFAULT_FS_URI/Output/$PAI_JOB_NAME',
    // List of taskRole, one task role at least
    taskRoles: [
        {
            // Name for the task role, need to be unique with other roles
            name: 'task',
            // Number of tasks for the task role, no less than 1
            taskNumber: 1,
            // CPU number for one task in the task role, no less than 1
            cpuNumber: 1,
            // GPU number for one task in the task role, no less than 0
            gpuNumber: 0,
            // Memory for one task in the task role, no less than 100
            memoryMB: 1000,
            // Executable command for tasks in the task role, can not be empty
            // ** PLEASE CHANGE MANUALLY **
            command: 'python $PAI_JOB_NAME/<start up script>'
        }
    ]
};
