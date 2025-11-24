import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Topic from "../models/Topic";
import Subtopic from "../models/Subtopic";

// Manually read .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
let MONGODB_URI = process.env.MONGODB_URI;

if (fs.existsSync(envPath)) {
  console.log("Found .env.local at", envPath);
  const envConfig = fs.readFileSync(envPath, "utf8");
  const match = envConfig.match(/MONGODB_URI=["']?(.*?)["']?$/m);
  if (match) {
    MONGODB_URI = match[1].trim();
    console.log("Found MONGODB_URI, length:", MONGODB_URI.length);
  } else {
    console.log("MONGODB_URI not found in .env.local");
  }
} else {
  console.log(".env.local not found at", envPath);
}

if (!MONGODB_URI) {
  console.error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
  process.exit(1);
}

const topicsData = [
  {
    name: "Algorithms",
    subtopics: [
      {
        name: "Sorting Algorithms",
        leetCodeLink: "https://leetcode.com/tag/sorting/",
        youtubeLink:
          "https://youtube.com/results?search_query=sorting+algorithms",
        articleLink: "https://geeksforgeeks.org/sorting-algorithms/",
        level: "Easy",
      },
      {
        name: "Binary Search",
        leetCodeLink: "https://leetcode.com/tag/binary-search/",
        youtubeLink: "https://youtube.com/results?search_query=binary+search",
        articleLink: "https://geeksforgeeks.org/binary-search/",
        level: "Easy",
      },
      {
        name: "Dynamic Programming",
        leetCodeLink: "https://leetcode.com/tag/dynamic-programming/",
        youtubeLink:
          "https://youtube.com/results?search_query=dynamic+programming",
        articleLink: "https://geeksforgeeks.org/dynamic-programming/",
        level: "Hard",
      },
      {
        name: "Greedy Algorithms",
        leetCodeLink: "https://leetcode.com/tag/greedy/",
        youtubeLink:
          "https://youtube.com/results?search_query=greedy+algorithms",
        articleLink: "https://geeksforgeeks.org/greedy-algorithms/",
        level: "Medium",
      },
      {
        name: "Backtracking",
        leetCodeLink: "https://leetcode.com/tag/backtracking/",
        youtubeLink: "https://youtube.com/results?search_query=backtracking",
        articleLink: "https://geeksforgeeks.org/backtracking-algorithms/",
        level: "Medium",
      },
      {
        name: "Graph Traversal (BFS/DFS)",
        leetCodeLink: "https://leetcode.com/tag/breadth-first-search/",
        youtubeLink: "https://youtube.com/results?search_query=graph+traversal",
        articleLink:
          "https://geeksforgeeks.org/graph-data-structure-and-algorithms/",
        level: "Medium",
      },
      {
        name: "Divide and Conquer",
        leetCodeLink: "https://leetcode.com/tag/divide-and-conquer/",
        youtubeLink:
          "https://youtube.com/results?search_query=divide+and+conquer",
        articleLink: "https://geeksforgeeks.org/divide-and-conquer/",
        level: "Medium",
      },
      {
        name: "Bit Manipulation",
        leetCodeLink: "https://leetcode.com/tag/bit-manipulation/",
        youtubeLink:
          "https://youtube.com/results?search_query=bit+manipulation",
        articleLink: "https://geeksforgeeks.org/bitwise-algorithms/",
        level: "Easy",
      },
    ],
  },
  {
    name: "Data Structures",
    subtopics: [
      {
        name: "Arrays & Hashing",
        leetCodeLink: "https://leetcode.com/tag/array/",
        youtubeLink: "https://youtube.com/results?search_query=arrays+hashing",
        articleLink: "https://geeksforgeeks.org/array-data-structure/",
        level: "Easy",
      },
      {
        name: "Linked Lists",
        leetCodeLink: "https://leetcode.com/tag/linked-list/",
        youtubeLink: "https://youtube.com/results?search_query=linked+lists",
        articleLink: "https://geeksforgeeks.org/data-structures/linked-list/",
        level: "Easy",
      },
      {
        name: "Stacks",
        leetCodeLink: "https://leetcode.com/tag/stack/",
        youtubeLink: "https://youtube.com/results?search_query=stacks",
        articleLink: "https://geeksforgeeks.org/stack-data-structure/",
        level: "Easy",
      },
      {
        name: "Queues",
        leetCodeLink: "https://leetcode.com/tag/queue/",
        youtubeLink: "https://youtube.com/results?search_query=queues",
        articleLink: "https://geeksforgeeks.org/queue-data-structure/",
        level: "Easy",
      },
      {
        name: "Trees & BST",
        leetCodeLink: "https://leetcode.com/tag/tree/",
        youtubeLink: "https://youtube.com/results?search_query=trees+bst",
        articleLink: "https://geeksforgeeks.org/binary-tree-data-structure/",
        level: "Medium",
      },
      {
        name: "Heaps / Priority Queues",
        leetCodeLink: "https://leetcode.com/tag/heap/",
        youtubeLink: "https://youtube.com/results?search_query=heaps",
        articleLink: "https://geeksforgeeks.org/heap-data-structure/",
        level: "Medium",
      },
      {
        name: "Graphs",
        leetCodeLink: "https://leetcode.com/tag/graph/",
        youtubeLink: "https://youtube.com/results?search_query=graphs",
        articleLink:
          "https://geeksforgeeks.org/graph-data-structure-and-algorithms/",
        level: "Hard",
      },
      {
        name: "Tries",
        leetCodeLink: "https://leetcode.com/tag/trie/",
        youtubeLink: "https://youtube.com/results?search_query=tries",
        articleLink: "https://geeksforgeeks.org/trie-insert-and-search/",
        level: "Medium",
      },
    ],
  },
  {
    name: "Databases",
    subtopics: [
      {
        name: "SQL Basics (SELECT, WHERE)",
        youtubeLink: "https://youtube.com/results?search_query=sql+basics",
        articleLink: "https://w3schools.com/sql/",
        level: "Easy",
      },
      {
        name: "Joins (Inner, Outer, Left, Right)",
        youtubeLink: "https://youtube.com/results?search_query=sql+joins",
        articleLink: "https://w3schools.com/sql/sql_join.asp",
        level: "Medium",
      },
      {
        name: "Normalization (1NF, 2NF, 3NF)",
        youtubeLink:
          "https://youtube.com/results?search_query=db+normalization",
        articleLink:
          "https://geeksforgeeks.org/database-normalization-introduction/",
        level: "Medium",
      },
      {
        name: "Indexing & Optimization",
        youtubeLink: "https://youtube.com/results?search_query=db+indexing",
        articleLink: "https://geeksforgeeks.org/indexing-in-databases-set-1/",
        level: "Hard",
      },
      {
        name: "Transactions & ACID",
        youtubeLink: "https://youtube.com/results?search_query=db+transactions",
        articleLink: "https://geeksforgeeks.org/acid-properties-in-dbms/",
        level: "Hard",
      },
      {
        name: "NoSQL Databases (MongoDB)",
        youtubeLink: "https://youtube.com/results?search_query=nosql+mongodb",
        articleLink: "https://mongodb.com/nosql-explained",
        level: "Medium",
      },
      {
        name: "Sharding & Partitioning",
        youtubeLink: "https://youtube.com/results?search_query=db+sharding",
        articleLink:
          "https://geeksforgeeks.org/database-sharding-a-system-design-concept/",
        level: "Hard",
      },
      {
        name: "Replication & Consistency",
        youtubeLink: "https://youtube.com/results?search_query=db+replication",
        articleLink: "https://geeksforgeeks.org/replication-in-dbms/",
        level: "Hard",
      },
    ],
  },
  {
    name: "Machine Learning",
    subtopics: [
      {
        name: "Linear Regression",
        youtubeLink:
          "https://youtube.com/results?search_query=linear+regression",
        articleLink: "https://geeksforgeeks.org/ml-linear-regression/",
        level: "Easy",
      },
      {
        name: "Logistic Regression",
        youtubeLink:
          "https://youtube.com/results?search_query=logistic+regression",
        articleLink:
          "https://geeksforgeeks.org/understanding-logistic-regression/",
        level: "Easy",
      },
      {
        name: "Decision Trees & Random Forests",
        youtubeLink: "https://youtube.com/results?search_query=decision+trees",
        articleLink: "https://geeksforgeeks.org/decision-tree/",
        level: "Medium",
      },
      {
        name: "Support Vector Machines (SVM)",
        youtubeLink: "https://youtube.com/results?search_query=svm",
        articleLink:
          "https://geeksforgeeks.org/support-vector-machine-algorithm/",
        level: "Medium",
      },
      {
        name: "Neural Networks Basics",
        youtubeLink: "https://youtube.com/results?search_query=neural+networks",
        articleLink:
          "https://geeksforgeeks.org/neural-networks-a-beginners-guide/",
        level: "Medium",
      },
      {
        name: "Deep Learning (CNN, RNN)",
        youtubeLink: "https://youtube.com/results?search_query=deep+learning",
        articleLink: "https://geeksforgeeks.org/introduction-deep-learning/",
        level: "Hard",
      },
      {
        name: "Clustering (K-Means)",
        youtubeLink: "https://youtube.com/results?search_query=k-means",
        articleLink:
          "https://geeksforgeeks.org/k-means-clustering-introduction/",
        level: "Medium",
      },
      {
        name: "Natural Language Processing (NLP)",
        youtubeLink: "https://youtube.com/results?search_query=nlp",
        articleLink:
          "https://geeksforgeeks.org/natural-language-processing-nlp-tutorial/",
        level: "Hard",
      },
    ],
  },
  {
    name: "Operating Systems",
    subtopics: [
      {
        name: "Process Management",
        youtubeLink:
          "https://youtube.com/results?search_query=os+process+management",
        articleLink:
          "https://geeksforgeeks.org/introduction-of-process-management/",
        level: "Medium",
      },
      {
        name: "Threads & Concurrency",
        youtubeLink: "https://youtube.com/results?search_query=os+threads",
        articleLink: "https://geeksforgeeks.org/thread-in-operating-system/",
        level: "Hard",
      },
      {
        name: "CPU Scheduling Algorithms",
        youtubeLink: "https://youtube.com/results?search_query=cpu+scheduling",
        articleLink:
          "https://geeksforgeeks.org/cpu-scheduling-in-operating-systems/",
        level: "Medium",
      },
      {
        name: "Deadlocks",
        youtubeLink: "https://youtube.com/results?search_query=os+deadlocks",
        articleLink:
          "https://geeksforgeeks.org/introduction-of-deadlock-in-operating-system/",
        level: "Medium",
      },
      {
        name: "Memory Management",
        youtubeLink:
          "https://youtube.com/results?search_query=os+memory+management",
        articleLink:
          "https://geeksforgeeks.org/memory-management-in-operating-system/",
        level: "Hard",
      },
      {
        name: "Virtual Memory & Paging",
        youtubeLink: "https://youtube.com/results?search_query=virtual+memory",
        articleLink:
          "https://geeksforgeeks.org/virtual-memory-in-operating-system/",
        level: "Hard",
      },
      {
        name: "File Systems",
        youtubeLink: "https://youtube.com/results?search_query=file+systems",
        articleLink:
          "https://geeksforgeeks.org/file-systems-in-operating-system/",
        level: "Medium",
      },
      {
        name: "I/O Management",
        youtubeLink: "https://youtube.com/results?search_query=io+management",
        articleLink:
          "https://geeksforgeeks.org/input-output-systems-in-operating-system/",
        level: "Medium",
      },
    ],
  },
  {
    name: "Computer Networks",
    subtopics: [
      {
        name: "OSI & TCP/IP Models",
        youtubeLink: "https://youtube.com/results?search_query=osi+model",
        articleLink: "https://geeksforgeeks.org/layers-of-osi-model/",
        level: "Easy",
      },
      {
        name: "HTTP / HTTPS / HTTP2",
        youtubeLink: "https://youtube.com/results?search_query=http+https",
        articleLink:
          "https://geeksforgeeks.org/difference-between-http-and-https/",
        level: "Medium",
      },
      {
        name: "DNS Resolution",
        youtubeLink: "https://youtube.com/results?search_query=dns+resolution",
        articleLink:
          "https://geeksforgeeks.org/domain-name-system-dns-in-application-layer/",
        level: "Medium",
      },
      {
        name: "TCP vs UDP",
        youtubeLink: "https://youtube.com/results?search_query=tcp+vs+udp",
        articleLink:
          "https://geeksforgeeks.org/differences-between-tcp-and-udp/",
        level: "Easy",
      },
      {
        name: "Sockets & Ports",
        youtubeLink: "https://youtube.com/results?search_query=sockets+ports",
        articleLink: "https://geeksforgeeks.org/socket-programming-cc/",
        level: "Medium",
      },
      {
        name: "Routing Protocols (BGP, OSPF)",
        youtubeLink:
          "https://youtube.com/results?search_query=routing+protocols",
        articleLink:
          "https://geeksforgeeks.org/routing-protocols-in-computer-network/",
        level: "Hard",
      },
      {
        name: "Firewalls & Security",
        youtubeLink:
          "https://youtube.com/results?search_query=network+security",
        articleLink:
          "https://geeksforgeeks.org/introduction-of-firewall-in-computer-network/",
        level: "Medium",
      },
      {
        name: "Wireless Networks (Wi-Fi)",
        youtubeLink:
          "https://youtube.com/results?search_query=wireless+networks",
        articleLink: "https://geeksforgeeks.org/wireless-networks/",
        level: "Easy",
      },
    ],
  },
  {
    name: "System Design",
    subtopics: [
      {
        name: "Load Balancing",
        youtubeLink: "https://youtube.com/results?search_query=load+balancing",
        articleLink: "https://geeksforgeeks.org/load-balancing-system-design/",
        level: "Medium",
      },
      {
        name: "Caching Strategies",
        youtubeLink: "https://youtube.com/results?search_query=caching",
        articleLink: "https://geeksforgeeks.org/caching-system-design-concept/",
        level: "Medium",
      },
      {
        name: "Database Sharding",
        youtubeLink: "https://youtube.com/results?search_query=sharding",
        articleLink:
          "https://geeksforgeeks.org/database-sharding-a-system-design-concept/",
        level: "Hard",
      },
      {
        name: "CAP Theorem",
        youtubeLink: "https://youtube.com/results?search_query=cap+theorem",
        articleLink: "https://geeksforgeeks.org/the-cap-theorem-in-dbms/",
        level: "Medium",
      },
      {
        name: "Microservices Architecture",
        youtubeLink: "https://youtube.com/results?search_query=microservices",
        articleLink: "https://geeksforgeeks.org/microservices-introduction/",
        level: "Hard",
      },
      {
        name: "API Design (REST, GraphQL)",
        youtubeLink: "https://youtube.com/results?search_query=api+design",
        articleLink: "https://geeksforgeeks.org/rest-api-introduction/",
        level: "Medium",
      },
      {
        name: "Message Queues (Kafka, RabbitMQ)",
        youtubeLink: "https://youtube.com/results?search_query=message+queues",
        articleLink: "https://geeksforgeeks.org/message-queue-system-design/",
        level: "Hard",
      },
      {
        name: "Consistent Hashing",
        youtubeLink:
          "https://youtube.com/results?search_query=consistent+hashing",
        articleLink: "https://geeksforgeeks.org/consistent-hashing/",
        level: "Hard",
      },
    ],
  },
  {
    name: "Web Development",
    subtopics: [
      {
        name: "HTML5 & CSS3",
        youtubeLink: "https://youtube.com/results?search_query=html+css",
        articleLink: "https://w3schools.com/html/",
        level: "Easy",
      },
      {
        name: "JavaScript (ES6+)",
        youtubeLink: "https://youtube.com/results?search_query=javascript",
        articleLink: "https://javascript.info/",
        level: "Easy",
      },
      {
        name: "React.js / Next.js",
        youtubeLink: "https://youtube.com/results?search_query=react+nextjs",
        articleLink: "https://react.dev/",
        level: "Medium",
      },
      {
        name: "Node.js & Express",
        youtubeLink: "https://youtube.com/results?search_query=nodejs",
        articleLink: "https://nodejs.org/en/docs/",
        level: "Medium",
      },
      {
        name: "Authentication (JWT, OAuth)",
        youtubeLink: "https://youtube.com/results?search_query=auth+jwt",
        articleLink: "https://auth0.com/intro-to-iam/what-is-jwt/",
        level: "Medium",
      },
      {
        name: "Web Security (XSS, CSRF)",
        youtubeLink: "https://youtube.com/results?search_query=web+security",
        articleLink: "https://owasp.org/www-project-top-ten/",
        level: "Hard",
      },
      {
        name: "Performance Optimization",
        youtubeLink: "https://youtube.com/results?search_query=web+performance",
        articleLink: "https://web.dev/learn/performance/",
        level: "Hard",
      },
      {
        name: "Testing (Jest, Cypress)",
        youtubeLink: "https://youtube.com/results?search_query=web+testing",
        articleLink: "https://jestjs.io/",
        level: "Medium",
      },
    ],
  },
  {
    name: "DevOps",
    subtopics: [
      {
        name: "Docker & Containerization",
        youtubeLink: "https://youtube.com/results?search_query=docker",
        articleLink: "https://docker.com/get-started/",
        level: "Medium",
      },
      {
        name: "Kubernetes (K8s)",
        youtubeLink: "https://youtube.com/results?search_query=kubernetes",
        articleLink: "https://kubernetes.io/docs/home/",
        level: "Hard",
      },
      {
        name: "CI/CD Pipelines",
        youtubeLink: "https://youtube.com/results?search_query=cicd",
        articleLink: "https://gitlab.com/topics/ci-cd/",
        level: "Medium",
      },
      {
        name: "Infrastructure as Code (Terraform)",
        youtubeLink: "https://youtube.com/results?search_query=terraform",
        articleLink: "https://terraform.io/",
        level: "Hard",
      },
      {
        name: "Configuration Management (Ansible)",
        youtubeLink: "https://youtube.com/results?search_query=ansible",
        articleLink: "https://ansible.com/",
        level: "Medium",
      },
      {
        name: "Monitoring (Prometheus, Grafana)",
        youtubeLink: "https://youtube.com/results?search_query=monitoring",
        articleLink: "https://prometheus.io/",
        level: "Medium",
      },
      {
        name: "Logging (ELK Stack)",
        youtubeLink: "https://youtube.com/results?search_query=elk+stack",
        articleLink: "https://elastic.co/what-is/elk-stack",
        level: "Medium",
      },
      {
        name: "Cloud Providers (AWS/Azure/GCP)",
        youtubeLink: "https://youtube.com/results?search_query=cloud+providers",
        articleLink: "https://aws.amazon.com/what-is-cloud-computing/",
        level: "Medium",
      },
    ],
  },
  {
    name: "Cloud Computing",
    subtopics: [
      {
        name: "Virtualization Basics",
        youtubeLink: "https://youtube.com/results?search_query=virtualization",
        articleLink:
          "https://vmware.com/topics/glossary/content/virtualization",
        level: "Easy",
      },
      {
        name: "AWS EC2 & S3",
        youtubeLink: "https://youtube.com/results?search_query=aws+ec2+s3",
        articleLink: "https://aws.amazon.com/ec2/",
        level: "Medium",
      },
      {
        name: "Serverless (Lambda)",
        youtubeLink: "https://youtube.com/results?search_query=serverless",
        articleLink: "https://aws.amazon.com/serverless/",
        level: "Medium",
      },
      {
        name: "Cloud Storage Options",
        youtubeLink: "https://youtube.com/results?search_query=cloud+storage",
        articleLink: "https://google.com/cloud/storage",
        level: "Easy",
      },
      {
        name: "VPC & Networking",
        youtubeLink: "https://youtube.com/results?search_query=vpc",
        articleLink: "https://aws.amazon.com/vpc/",
        level: "Hard",
      },
      {
        name: "IAM & Security",
        youtubeLink: "https://youtube.com/results?search_query=iam",
        articleLink: "https://aws.amazon.com/iam/",
        level: "Hard",
      },
      {
        name: "Load Balancers & Auto Scaling",
        youtubeLink: "https://youtube.com/results?search_query=load+balancers",
        articleLink: "https://aws.amazon.com/elasticloadbalancing/",
        level: "Medium",
      },
      {
        name: "Cloud Migration Strategies",
        youtubeLink: "https://youtube.com/results?search_query=cloud+migration",
        articleLink:
          "https://azure.microsoft.com/en-us/resources/cloud-migration/",
        level: "Hard",
      },
    ],
  },
];

async function seed() {
  console.log("Seeding Topics...");
  try {
    await mongoose.connect(MONGODB_URI!);

    // Clear existing data
    await Topic.deleteMany({});
    await Subtopic.deleteMany({});
    console.log("Cleared existing topics and subtopics");

    for (const topicData of topicsData) {
      const topic = await Topic.create({ name: topicData.name });
      console.log(`Created topic: ${topic.name}`);

      for (const subData of topicData.subtopics) {
        await Subtopic.create({
          topicId: topic._id,
          name: subData.name,
          leetCodeLink: (subData as any).leetCodeLink,
          youtubeLink: (subData as any).youtubeLink,
          articleLink: (subData as any).articleLink,
          level: subData.level,
        });
      }
      console.log(
        `Created ${topicData.subtopics.length} subtopics for ${topic.name}`
      );
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

// Execute if run directly
// In a real app, you might want to check if require.main === module, but for this script usage it's fine.
seed();
