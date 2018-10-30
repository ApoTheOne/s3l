### Managing Throughput Capacity Automatically with DynamoDB Auto Scaling [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/AutoScaling.html)

DynamoDB auto scaling uses the AWS Application Auto Scaling service to dynamically adjust provisioned throughput capacity on your behalf, in response to actual traffic patterns. This enables a table or a global secondary index to increase its provisioned read and write capacity to handle sudden increases in traffic, without throttling. When the workload decreases, Application Auto Scaling decreases the throughput so that you don't pay for unused provisioned capacity.

Important:
Currently, Auto Scaling does not scale down your provisioned capacity if your table’s consumed capacity becomes zero. As a workaround, you can send requests to the table until Auto Scaling scales down to the minimum capacity, or change the policy to reduce the maximum provisioned capacity to be the same as the minimum provisioned capacity.

DynamoDB auto scaling modifies provisioned throughput settings only when the actual workload stays elevated (or depressed) for a sustained period of several minutes. The Application Auto Scaling target tracking algorithm seeks to keep the target utilization at or near your chosen value over the long term.

Sudden, short-duration spikes of activity are accommodated by the table's built-in burst capacity. For more information, see Using Burst Capacity Effectively.

### Approaching NoSQL Design [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-general-nosql-design.html)

The first step in designing your DynamoDB application is to identify the specific query patterns that the system must satisfy.

In particular, it is important to understand three fundamental properties of your application's access patterns before you begin:

1. Data size: Knowing how much data will be stored and requested at one time will help determine the most effective way to partition the data.

2. Data shape: Instead of reshaping data when a query is processed (as an RDBMS system does), a NoSQL database organizes data so that its shape in the database corresponds with what will be queried. This is a key factor in increasing speed and scalability.

3. Data velocity: DynamoDB scales by increasing the number of physical partitions that are available to process queries, and by efficiently distributing data across those partitions. Knowing in advance what the peak query loads might be helps determine how to partition data to best use I/O capacity.

After you identify specific query requirements, you can organize data according to general principles that govern performance:

1.  Keep related data together. Research on routing-table optimization 20 years ago found that "locality of reference" was the single most important factor in speeding up response time: keeping related data together in one place. This is equally true in NoSQL systems today, where keeping related data in close proximity has a major impact on cost and performance. Instead of distributing related data items across multiple tables, you should keep related items in your NoSQL system as close together as possible.

As a general rule, you should maintain as few tables as possible in a DynamoDB application. As emphasized earlier, most well designed applications require only one table, unless there is a specific reason for using multiple tables.

Exceptions are cases where high-volume time series data are involved, or datasets that have very different access patterns—but these are exceptions. A single table with inverted indexes can usually enable simple queries to create and retrieve the complex hierarchical data structures required by your application.

2.  Use sort order. Related items can be grouped together and queried efficiently if their key design causes them to sort together. This is an important NoSQL design strategy.

3.  Distribute queries. It is also important that a high volume of queries not be focused on one part of the database, where they can exceed I/O capacity. Instead, you should design data keys to distribute traffic evenly across partitions as much as possible, avoiding "hot spots."

4.  Use global secondary indexes. By creating specific global secondary indexes, you can enable different queries than your main table can support, and that are still fast and relatively inexpensive.

### Using Burst Capacity Effectively [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)

DynamoDB provides some flexibility in your per-partition throughput provisioning by providing burst capacity, as follows. Whenever you are not fully using a partition's throughput, DynamoDB reserves a portion of that unused capacity for later bursts of throughput to handle usage spikes.

DynamoDB currently retains up to five minutes (300 seconds) of unused read and write capacity. During an occasional burst of read or write activity, these extra capacity units can be consumed quickly—even faster than the per-second provisioned throughput capacity that you've defined for your table.

DynamoDB can also consume burst capacity for background maintenance and other tasks without prior notice.

Note that these details of burst capacity might change in the future.

### Understanding DynamoDB Adaptive Capacity [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html)

It's not always possible to distribute read and write activity evenly all the time. When data access is imbalanced, a "hot" partition can receive such a higher volume of read and write traffic compared to other partitions. **In extreme cases, throttling can occur if a single partition receives more than 3,000 RCUs or 1,000 WCUs.**

To better accommodate uneven access patterns, DynamoDB adaptive capacity enables your application to continue reading and writing to hot partitions without being throttled, provided that traffic does not exceed your table’s total provisioned capacity or the partition maximum capacity. Adaptive capacity works by automatically increasing throughput capacity for partitions that receive more traffic.

Adaptive capacity is enabled automatically for every DynamoDB table, so you don't need to explicitly enable or disable it.

Note:
There is typically a 5-minute to 30-minute interval between the time throttling of a hot partition begins and the time that adaptive capacity activates.

The following diagram illustrates how adaptive capacity works. The example table is provisioned with 400 write-capacity units (WCUs) evenly shared across four partitions, allowing each partition to sustain up to 100 WCUs per second. Partitions 1, 2, and 3 each receive write traffic of 50 WCU/sec. Partition 4 receives 150 WCU/sec. This hot partition can accept write traffic while it still has unused burst capacity, but eventually it will throttle traffic that exceeds 100 WCU/sec.

DynamoDB adaptive capacity responds by increasing partition 4's capacity so that it can sustain the higher workload of 150 WCU/sec without being throttled.
![Adaptive Capacity and Partitioning](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/images/adaptive-capacity.png)

### Designing Partition Keys to Distribute Your Workload Evenly [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-uniform-load.html)

The partition key portion of a table's primary key determines the logical partitions in which a table's data is stored.
This in turn affects the underlying physical partitions. Provisioned I/O capacity for the table is divided evenly among these physical partitions.
Therefore a partition key design that doesn't distribute I/O requests evenly can create "hot" partitions that result in throttling and use your provisioned I/O capacity inefficiently.

### Using Write Sharding to Distribute Workloads Evenly [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-sharding.html)

One way to better distribute writes across a partition key space in DynamoDB is to expand the space. You can do this in several different ways. You can add a random number to the partition key values to distribute the items among partitions, or you can use a number that is calculated based on something that you are querying on.

### Distributing Write Activity Efficiently During Data Upload [Source](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-data-upload.html)

Typically, when you load data from other data sources, Amazon DynamoDB partitions your table data on multiple servers. You get better performance if you upload data to all the allocated servers simultaneously.

### GOOD READS:

[Choosing the right dynamodb partition key](https://aws.amazon.com/blogs/database/choosing-the-right-dynamodb-partition-key/)

[Using Sort Keys to Organize Data in Amazon DynamoDB](https://aws.amazon.com/blogs/database/using-sort-keys-to-organize-data-in-amazon-dynamodb/?nc1=b_rp)
