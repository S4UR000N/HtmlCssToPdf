module.exports = {
  AttributeDefinitions: [
    {
      AttributeName: 'FILE_ID',
      AttributeType: 'S'
    },
    {
      AttributeName: 'FILE_PATH',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'FILE_ID',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'FILES',
  StreamSpecification: {
    StreamEnabled: false
  }
};