-- 查询所有学生
-- *代表所有的列，工作中一般不使用*
select * from student;
select `id`,`name`,`age`,`gander` from `student`;
select `id`,`name`,`age` from `student`;
-- 给所有的年龄加1
select `id`,`name`,`age`+1 from `student`;
select `id`,`name`,ifnull(`age`,0) from `student`;
-- 别名
select `id` '编号',`name` as `名字`,ifnull(`age`,0) as `age` from `student` as s;
-- 条件控制
select * from student where id = 3;
select * from student where id in (1,3,7);
select * from student where id > 5;
select * from student where id between 3 and 7;
select * from student where id between 3 and 7 and age > 20;
select * from student where id between 3 and 7 or age > 20;

-- 模糊查询
select * from student where name like '张_';
select * from student where name like '张%';
-- 去重工作
select distinct `name`,`age`,`gander` from `student`;

-- 根据年龄排序
-- order by 默认正序排序
select * from student order by age asc;
-- 倒序
select * from student order by age desc;
select * from student order by age desc,id desc;
-- 聚合函数
select max(age) from student

SELECT * from student where age = 24;

select min(age) from student;
select avg(age) from student;
select sum(age) from student;
select count(*) from student;

-- 分组一般要配合聚合
-- 分组之后，查询条件不能跟其他的列
select gander,MAX(age),COUNT(*) from student GROUP BY gander;

select gander,MAX(age),COUNT(*) from student GROUP BY gander having gander = '男';

select gander,MAX(age),COUNT(*) from student where gander = '男' GROUP BY gander;

-- limit
select * from student limit 0,3;
select * from student limit 3,3;
select * from student limit 6,3;

select * from student limit 3;
select * from student order by age desc limit 3;


SELECT * FROM course,teacher where course.t_id = teacher.id;
-- 内连接
SELECT * FROM course c INNER JOIN teacher t ON c.t_id = t.id;

-- 左外连接
select * from course c left outer join teacher t on c.t_id = t.id;
select * from course c left join teacher t on c.t_id = t.id;

-- 右外连接
select * from course c right join teacher t on c.t_id = t.id;

-- 全外连接（myspl不支持）
select * from course c full join teacher t on c.t_id = t.id;

SELECT * from teacher t right outer join course c on c.t_id = t.id
union
SELECT * from teacher t left outer join course c on c.t_id = t.id

-- 子查询
-- 查询比连宇栋年龄大的所有的学生(标量子查询)
select * from student where age > (
	select age from student where name = '连宇栋'
);
-- 查询有一门学科分数大于九十分的学生信息 (列子查询)
select * from student where id in(
	select distinct s_id from scores where score > 90
);

-- 查询男生且是年龄大学的学生信息
select * from student where gander = '男' and age = (
	select max(age) from student  
	GROUP BY gander having gander = '男'
);

select * from student where (gander,age) = (
	select gander,max(age) from student  
	GROUP BY gander having gander = '男'
);

-- 取排名数学成绩前五名的学生，正序排列
select * from (
	select s.id,s.name sname,r.score,c.name cname from student s
	left join scores r on s.id = r.s_id
	left join course c on r.c_id = c.id
	where c.name = '数学' order by r.score desc limit 5
) t order by t.score;

-- select 子查询
select *,1,2,3,4,5,6 from student;

-- 查询老师的信息和他代课的数量（有很多）
select t.id,t.name,COUNT(*) `代课的数量` from teacher t left join course c 
on t.id = c.t_id GROUP BY t.id,t.name;

select t.id,t.name,(
	select count(*) from course c where c.t_id = t.id
) as `代课的数量` from teacher t;

-- exists型子查询
-- 有课程的老师
select * from teacher t where exists (
	select * from course c where c.t_id = t.id
);

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

-- 1、查询‘01’号学生的姓名和各科成绩。
SELECT s.id,s.name,c.name,r.score from student s
left join scores r ON r.s_id = s.id
left join course c ON c.id = r.c_id
where s.id = 1;

-- 2、查询各个学科的平均成绩，最高成绩。
SELECT c.id,c.`name`,AVG(r.score),MAX(r.score) FROM course c 
left JOIN scores r on c.id = r.c_id
GROUP BY c.id,c.`name`;

-- 3、查询每个同学的最高成绩及科目名称。
SELECT t.id,t.`name`,c.id,c.`name`,r.score FROM
(SELECT s.id,s.`name`,(
	SELECT MAX(score) FROM scores r WHERE r.s_id = s.id
) score FROM student s) t 
LEFT JOIN scores r ON r.s_id = t.id and r.score = t.score 
LEFT JOIN course c ON r.c_id = c.id;

-- 4、查询所有姓张的同学的各科成绩。
SELECT s.id,s.`name`,c.`name`,r.score FROM student s 
LEFT JOIN scores r ON s.id = r.s_id
LEFT JOIN course c ON c.id = r.c_id
WHERE s.`name` LIKE '张%'

-- 5、查询每个课程最高分的同学信息。
SELECT * FROM student s WHERE s.id IN 
(
	SELECT distinct s_id FROM 
	(
		SELECT c.id,MAX(score) as score FROM scores r 
		LEFT JOIN course c ON r.c_id = c.id
		GROUP BY c.id
	) t
	LEFT JOIN scores r ON r.c_id = t.id and t.score = r.score
);

-- 6、查询名字中含有“张”和‘李’字的学生信息和各科成绩 。
SELECT s.id,s.`name`,s.age,s.gander,c.`name`,r.score FROM student s
LEFT JOIN scores r ON r.s_id = s.id
LEFT JOIN course c ON c.id = r.c_id
WHERE s.`name` LIKE '%张%' OR '%李%'

-- 7、查询平均成绩及格的同学的信息。
SELECT * FROM student s WHERE s.id IN (
	SELECT r.s_id FROM scores r
	GROUP BY r.s_id
	having AVG(r.score) > 60
)

-- 8、将学生按照总分数进行排名。
SELECT s.id,s.`name`,s.age,s.gander,t.sum AS '总分数' FROM student s
LEFT JOIN (
	SELECT r.s_id,SUM(score) as sum FROM scores r 
	GROUP BY r.s_id
) t ON s.id = t.s_id
ORDER BY t.sum DESC;

-- 9、查询数学成绩的最高分、最低分、平均分。
SELECT MAX(score),MIN(score),AVG(score) FROM scores r WHERE r.c_id = (
	SELECT c.id FROM course c WHERE c.`name` = '数学'
) 

-- 10、将各科目按照平均分排序。
SELECT c.id,c.`name`,AVG(score) AS score FROM course c 
LEFT JOIN scores r ON r.c_id = c.id
GROUP BY c.id
ORDER BY score DESC;

-- 11、查询老师的信息和他所带科目的平均分。
SELECT e.id,e.`name`,t.c_id,t.`name`,t.score FROM teacher e
LEFT JOIN (
	SELECT r.c_id,c.`name`,AVG(score) AS score,c.t_id FROM scores r 
	LEFT JOIN course c ON r.c_id = c.id
	GROUP BY r.c_id
) t ON t.t_id = e.id;

-- 12、查询被“张楠”和‘‘李子豪’教的课程的最高分和平均分。
select t.id,t.name,c.id,c.name,avg(r.score) 
from teacher t
left join course c on t.id = c.t_id 
left join scores r on r.c_id = c.id
group by t.id,t.name,c.id,c.name
having t.name in ('张楠','李子豪');

-- 13、查询每个同学的最好成绩的科目名称。
select t.id,t.sname,r.c_id,c.id,c.name,t.score  from
(select s.id,s.name sname,max(r.score) score 
from student s
left join scores r on r.s_id = s.id
group by s.id,s.name) t
left join scores r on r.s_id = t.id and r.score = t.score
left join course c on r.c_id = c.id;

-- 14、查询所有学生的课程及分数。
select s.id,s.name sname,c.id,c.name cname,r.score from student s
left join scores r on r.s_id = s.id
left join course c on c.id = r.c_id;

-- 15、查询课程编号为1且课程成绩在60分以上的学生的学号和姓名。 难度：两颗星
select * from student s where id in
(
	select r.s_id from scores r where r.c_id = 1 and r.score > 60
);

-- 16、查询平均成绩大于等于85的所有学生的学号、姓名和平均成绩。
select s.id,s.name,t.score from student s 
left join (
	select r.s_id ,avg(r.score) score from scores r group by r.s_id 
) t on s.id = t.s_id;

-- 17、查询有不及格课程的同学信息。
-- 什么叫有不及格 ---》最低分数的科目如果不及格
select * from student s where id in (
	select r.s_id from scores r group by r.s_id 
	HAVING min(r.score) < 60
);

-- 18、求每门课程的学生人数。
select c.id,c.name, t.number from course c
left join 
(select r.c_id,count(*) number from scores r group by r.c_id) t
on c.id = t.c_id;

select c.id,c.name,count(*) from course c 
left join scores r on c.id = r.c_id
group by c.id,c.name;

-- 19、查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列。
select c.id,c.name,avg(score) score from course c 
left join scores r on c.id = r.c_id 
group by c.id,c.name 
order by score desc,c.id asc;

-- 20、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩。
select s.id,s.name,t.score from student s 
right join (
	select r.s_id,avg(score) score from scores r 
	group by r.s_id having score >= 70
) t on s.id = t.s_id;

select s.id,s.name sname, avg(r.score) score from student s
left join scores r on r.s_id = s.id
left join course c on c.id = r.c_id
group by s.id,s.name having avg(r.score) > 70;

-- 21、查询有且仅有一门课程成绩在90分以上的学生信息
select * from student s where id in (
	select r.s_id from scores r where r.score > 90
	group by r.s_id having count(*) = 1
);

select s.id,s.name,s.gander from student s 
left join scores r on s.id = r.s_id 
where r.score > 90
group by s.id,s.name,s.gander having count(*) = 1;

-- 22、查询出只有三门课程的全部学生的学号和姓名。
select * from student s where id in (
	select r.s_id from scores r group by r.s_id having count(*) = 3
);

select s.id,s.name,s.gander from student s 
left join scores r on s.id = r.s_id 
group by s.id,s.name,s.gander having count(*) = 3;

-- 23、查询有不及格课程的课程信息。
select * from course c where id in (
	select r.c_id from scores r group by r.c_id
	HAVING min(r.score) < 60
);

select r.c_id,c.name from course c
left join scores r on c.id = r.c_id
group by r.c_id,c.name HAVING min(r.score) < 60;

-- 24、检索至少选修5门课程的学生学号。
select * from student s where s.id in (
	select r.s_id from scores r group by r.s_id having count(*) >= 5
);

select s.id,s.name from student s 
left join scores r on s.id = r.s_id
group by s.id,s.name having count(*) >= 5;

-- 25、查询没有学全所有课程的同学的信息。
select s.id,s.name,count(*) number from student s 
left join scores r on s.id = r.s_id
group by s.id,s.name having number < (
	select count(*) from course
);

-- 26、查询学全所有课程的同学的信息。
select s.id,s.name,count(*) number from student s 
left join scores r on s.id = r.s_id
group by s.id,s.name having number = (
	select count(*) from course
);

-- 27、 查询各学生都选了多少门课。
select s.id,s.name,count(*) number from student s 
left join scores r on s.id = r.s_id
group by s.id,s.name;

-- 28、查询课程名称为”java”，且分数低于60的学生姓名和分数。
select s.id,s.name,r.score from student s 
left join scores r on s.id = r.s_id
left join course c on r.c_id = c.id
where c.name = 'java' and r.score < 60;

-- 29、查询学过”张楠”老师授课的同学的信息。
select s.id,s.name from student s 
left join scores r on r.s_id = s.id
left join course c on c.id = r.c_id
left join teacher t on c.t_id = t.id 
where t.name = '张楠';

-- 30、查询没学过“张楠”老师授课的同学的信息。
select * from student where id not in
(select distinct r.s_id from scores r 
left join course c on c.id = r.c_id
left join teacher t on c.t_id = t.id 
where t.name = '张楠');
