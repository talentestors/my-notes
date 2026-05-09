---
title: 1、RocketMQ概述
icon: rocketmq
category:
  - middleware
  - rocketmq
tag:
  - rocketmq
  - 消息队列
order: 1
---

## MQ概述

### MQ简介

MQ，Message Queue，是一种提供消息队列服务的中间件，也称为消息中间件，是一套提供了消息生产、存储、消费全过程API的软件系统。消息即数据。一般消息的体量不会很大。

### MQ用途

从网上可以查看到很多的关于MQ用途的叙述，但总结起来其实就以下三点。

- 限流削峰
  - MQ可以将系统的超量请求暂存其中，以便系统后期可以慢慢进行处理，从而避免了请求的丢失或系统被压垮。
- 异步解耦
  - 上游系统对下游系统的调用若为同步调用，则会大大降低系统的吞吐量与并发度，且系统耦合度太高。而异步调用则会解决这些问题。所以两层之间若要实现由同步到异步的转化，一般性做法就是，在这两层间添加一个MQ层。
- 数据收集
  - 分布式系统会产生海量级数据流，如：业务日志、监控数据、用户行为等。针对这些数据流进行实时或批量采集汇总，然后对这些数据流进行大数据分析，这是当前互联网平台的必备技术。通过MQ完成此类数据收集是最好的选择。

### 常见MQ产品

- ActiveMQ
  - ActiveMQ是使用Java语言开发一款MQ产品。早期很多公司与项目中都在使用。但现在的社区活跃度已经很低。现在的项目中已经很少使用了。

- RabbitMQ
  - RabbitMQ是使用ErLang语言开发的一款MQ产品。其吞吐量较Kafka与RocketMQ要低，且由于其不是Java语言开发，所以公司内部对其实现定制化开发难度较大。

- Kafka
  - Kafka是使用Scala/Java语言开发的一款MQ产品。其最大的特点就是高吞吐率，常用于大数据领域的实时计算、日志采集等场景。其没有遵循任何常见的MQ协议，而是使用自研协议。对于Spring Cloud Netflix，其仅支持RabbitMQ与Kafka。

- RocketMQ
  - RocketMQ是使用Java语言开发的一款MQ产品。经过数年阿里双11的考验，性能与稳定性非常高。其没有遵循任何常见的MQ协议，而是使用自研协议。对于Spring Cloud Alibaba，其支持RabbitMQ、Kafka，但提倡使用RocketMQ。

### 对比

| 关键词     | ACTIVEMQ | RABBITMQ | KAFKA                       | ROCKETMQ                  |
| ---------- | -------- | -------- | --------------------------- | ------------------------- |
| 开发语言   | Java     | ErLang   | Java                        | Java                      |
| 单机吞吐量 | 万级     | 万级     | 十万级                      | 十万级                    |
| Topic      | -        | -        | 百级Topic时会影响系统吞吐量 | 千级Topic时会影响系统吞吐 |
| 社区活跃度 | 低       | 高       | 高                          | 高                        |

### MQ常见协议

一般情况下MQ的实现是要遵循一些常规性协议的。常见的协议如下：

#### JMS

> JMS，Java Messaging Service（Java消息服务）。是Java平台上有关MOM（Message Oriented Middleware，面向消息的中间件）的技术规范，它便于消息系统中的Java应用程序进行消息交换，并且通过提供标准的产生、发送、接收消息的接口，简化企业应用的开发。ActiveMQ是该协议的典型实现。

#### STOMP

> STOMP，Streaming Text Orientated Message Protocol（面向流文本的消息协议），是一种MOM设计的简单文本协议。STOMP提供一个可互操作的连接格式，允许客户端与任意STOMP消息代理（Broker）进行交互。ActiveMQ是该协议的典型实现，RabbitMQ通过插件可以支持该协议。

#### AMQP

> AMQP，Advanced Message Queuing Protocol（高级消息队列协议），一个提供统一消息服务的应用层标准，是应用层协议的一个开放标准，是一种MOM设计。基于此协议的客户端与消息中间件可传递消息，并不受客户端/中间件不同产品，不同开发语言等条件的限制。RabbitMQ是该协议的典型实现。

#### MQTT

> MQTT，Message Queuing Telemetry Transport（消息队列遥测传输），是IBM开发的一个即时通讯协议，是一种二进制协议，主要用于服务器和低功耗IoT（物联网）设备间的通信。该协议支持所有平台，几乎可以把所有联网物品和外部连接起来，被用来当做传感器和致动器的通信协议。RabbitMQ通过插件可以支持该协议。

## RocketMQ概述

### RocketMQ简介

> RocketMQ是一个统一消息引擎、轻量级数据处理平台。RocketMQ是一款阿里巴巴开源的消息中间件。2016年11月28日，阿里巴巴向Apache软件基金会捐赠RocketMQ，成为Apache孵化项目。2017年9月25日，Apache宣布RocketMQ孵化成为Apache顶级项目（TLP），成为国内首个互联网中间件在Apache上的顶级项目。

官网地址：[http://rocketmq.apache.org](http://rocketmq.apache.org/)

![RocketMQ Logo](https://rocketmq.apache.org/zh/img/Apache_RocketMQ_logo.svg.png)

### RocketMQ发展历程

- 2007年，阿里开始五彩石项目，Notify作为项目中交易核心消息流转系统，应运而生。Notify系统是RocketMQ的雏形。

- 2010年，B2B大规模使用ActiveMQ作为阿里的消息内核。阿里急需一个具有海量堆积能力的消息系统。

- 2011年初，Kafka开源。淘宝中间件团队在对Kafka进行了深入研究后，开发了一款新的MQ，MetaQ。

- 2012年，MetaQ发展到了v3.0版本，在它基础上进行了进一步的抽象，形成了RocketMQ，然后就将其进行了开源。

- 2015年，阿里在RocketMQ的基础上，又推出了一款专门针对阿里云上用户的消息系统Aliware MQ。

- 2016年双十一，RocketMQ承载了万亿级消息的流转，跨越了一个新的里程碑。11月28日，阿里巴巴向Apache软件基金会捐赠RocketMQ，成为Apache孵化项目。

- 2017年9月25日，Apache宣布RocketMQ孵化成为Apache顶级项目（TLP），成为国内首个互联网中间件在Apache上的顶级项目。

### RocketMQ领域模型

Apache RocketMQ 是一款典型的分布式架构下的中间件产品，使用异步通信方式和发布订阅的消息传输模型。

![RocketMQ 领域模型](https://rocketmq.apache.org/zh/assets/images/mainarchi-9b036e7ff5133d050950f25838367a17.png)

如上图所示，Apache RocketMQ 中消息的生命周期主要分为**消息生产**、**消息存储**、**消息消费**这三部分。

- **生产者（Producer）**：Apache RocketMQ 中用于产生消息的运行实体，一般集成于业务调用链路的上游。
- **主题（Topic）**：Apache RocketMQ 中消息传输和存储的顶层容器，用于标识同一类业务逻辑的消息。
- **消费者（Consumer）**：Apache RocketMQ 中用于接收并处理消息的运行实体，一般集成于业务调用链路的下游。

### RocketMQ基本模型

![RocketMQ 基本模型](https://rocketmq.apache.org/zh/assets/images/RocketMQ基本模型-ebcf3458d04b36f47f4c9633c1e36bf7.png)

### RocketMQ部署架构

![RocketMQ 部署架构](https://rocketmq.apache.org/zh/assets/images/RocketMQ部署架构-ee0435f80da5faecf47bca69b1c831cb.png)

### 通信方式

#### 同步调用

![同步调用](https://rocketmq.apache.org/zh/assets/images/syncarchi-ebbd41e1afd6adf432792ee2d7a91748.png)

同步调用指请求方发出一个调用请求后，在得到被调用方响应结果前，请求方一直阻塞等待，直到被调用方返回结果。

#### 异步调用

![异步调用](https://rocketmq.apache.org/zh/assets/images/asyncarchi-e7ee18dd77aca472fb80bb2238d9528b.png)

异步调用指请求方发出一个调用请求后，无需等待被调用方返回结果，请求方可以继续执行其他任务，被调用方处理完成后通过回调通知请求方。

### 消息传输模型

#### 点对点模型

![点对点模型](https://rocketmq.apache.org/zh/assets/images/p2pmode-fefdc2fbe4792e757e26befc0b3acbff.png)

在点对点模型下，一条消息只能被一个消费者消费。

#### 发布订阅模型

![发布订阅模型](https://rocketmq.apache.org/zh/assets/images/pubsub-042a4e5e5d76806943bd7dcfb730c5d5.png)

在发布订阅模型下，一条消息可以被多个消费者消费。
