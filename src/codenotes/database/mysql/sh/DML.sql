SELECT * FROM `authors`;
-- 插入数据
insert into `authors` (aut_name,gander,country,birthday,hobby) values ('JK罗琳','女','英国','1969-1-14','旅游'),('海明威','男','英国','1969-1-3','看书');

insert into `authors` values (2,'JK罗琳2','女','英国','1969-1-14','旅游');

-- 修改数据
update `authors` set aut_name = '吴军',country='中国';

update `authors` set aut_name = '马云',country='中国' where aut_id > 1;

update `authors` set aut_name = '码云',country='中国' where aut_id in (2,3);

update `authors` set aut_name = '张三',country='中国' where gander = '男';

update `authors` set aut_name = '李四',country='中国' where birthday is null;

update `authors` set aut_name = '王五',country='中国' where gander = '男' and country = '中国';

update `authors` set aut_name = '玉帝',country='中国' where aut_id between 1 and 2;

-- 删除
delete from `authors`;
delete from `authors` where aut_id = 4;

truncate table `authors`;