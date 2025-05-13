-- 数值型函数
select ceiling(1.2),floor(1.2),round(1.234,2),truncate(1.235,2),PI(),RAND();

SELECT s.id,s.`name`,ROUND(AVG(score),1) FROM student s 
LEFT JOIN scores r ON s.id = r.s_id
GROUP BY s.id,s.`name`

-- 字符串函数
select length('hello mysql'),
concat('hello',' ','mysql'),
LOWER('ABC'),upper('abc'),
left('abc',2),right('abc',2),
trim('    abc'),REPLACE('aaa.mysql.com','a','w'),substring('abcd',2),substring('abcd',1,2),
REVERSE('abc');

select concat(name,'-',gander) from student;

-- 时间和日期函数
select curdate(),curtime(),now(),sysdate();
select UNIX_TIMESTAMP(),FROM_UNIXTIME(UNIX_TIMESTAMP()+1000)

select month(now()),monthname(now()),dayname(NOW()),dayofweek(now()),week(now()),year(now())

select adddate(now(),INTERVAL 1 year)
select subdate(now(),INTERVAL 1 day)
select datediff(now(),'1949-10-1')
select DATE_FORMAT(NOW(),'%Y年%m月%d日')

-- 查询本月过生日的学生
SELECT * FROM student WHERE MONTH(birthday) = MONTH(NOW())

SELECT *,YEAR(NOW()) - YEAR(birthday) + 1 FROM student;
-- 

SELECT MD5('abc')

-- 流程控制函数
SELECT if(true,1,2)
select ifnull('abc','cba')
select ifnull(null,'cba')
select nullif('abc','abc')
select nullif('abcd','abc')

CREATE TABLE `mystudent` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(20) DEFAULT NULL,
  `COURSE` varchar(20) DEFAULT NULL,
  `SCORE` float DEFAULT '0',
  PRIMARY KEY (`ID`)
);

insert into mystudent(USER_NAME, COURSE, SCORE) values
("张三", "数学", 34),
("张三", "语文", 58),
("张三", "英语", 58),
("李四", "数学", 45),
("李四", "语文", 87),
("李四", "英语", 45),
("王五", "数学", 76),
("王五", "语文", 34),
("王五", "英语", 89);

-- 输出学生各科的成绩，以及评级，60以下是D,60-70是C，71-80：是B ，80以上是A

SELECT *,
case 
	when score < 60 then 'D'
	when score >= 60 and score < 70 then 'C'
	when score >= 70 and score < 80 then 'B'
	when score >= 80 then 'A'
end as '评级'
from mystudent;

-- 行转列案例，要求根据上边的表结构，查询出如下结果

select user_name,
   max(case course when '数学' then score else 0 end) as '数学',
   max(case course when '语文' then score else 0 end)	as '语文',
   max(case course when '英语' then score else 0 end)	as '英语'
from mystudent group by user_name
