-- 给author表添加列
alter table author add (hobby varchar(20),address varchar(50));
-- 修改列属性
alter table author modify address varchar(100);
-- 改变列名和属性
alter table author change address addr varchar(60);
-- 删除列
alter table author drop addr;
-- 修改表名
alter table author rename authors;
-- 删除表
drop table if exists `user`;
-- 查看表结构
desc authors;

show tables;
