drop TABLE if EXISTS student;
CREATE TABLE student (
    id INT(10) PRIMARY key,
    name VARCHAR (10),
    age INT (10) NOT NULL,
    gander varchar(2)
);

drop TABLE if EXISTS course;
CREATE TABLE course (
  id INT (10)  PRIMARY key,
  name VARCHAR (10) ,
  t_id INT (10) 
) ;

drop TABLE if EXISTS teacher;
CREATE TABLE teacher(
  id INT (10)  PRIMARY key,
  name VARCHAR (10) 
);

drop TABLE if EXISTS scores;
CREATE TABLE scores(
  s_id INT ,
  score INT (10),
  c_id INT (10) ,
	PRIMARY key(s_id,c_id)
) ;

insert into  student (id,name,age,gander)VALUES(1,'白杰',19,'男'),(2,'连宇栋',19,'男'),(3,'邸志伟',24,'男'),(4,'李兴',11,'男'),(5,'张琪',18,'男'),(6,'武三水',18,'女'),(7,'张志伟',16,'男'),(8,'康永亮',23,'男'),(9,'杨涛瑞',22,'女'),(10,'王杰',21,'男');

insert into  course (id,name,t_id)VALUES(1,'数学',1),(2,'语文',2),(3,'c++',3),(4,'java',4),(5,'php',null);


insert into  teacher (id,name)VALUES(1,'张楠'),(2,'李子豪'),(3,'薇薇姐'),(4,'猴哥'),(5,'八戒');


insert into  scores (s_id,score,c_id)VALUES(1,80,1);
insert into  scores (s_id,score,c_id)VALUES(1,56,2);
insert into  scores (s_id,score,c_id)VALUES(1,95,3);
insert into  scores (s_id,score,c_id)VALUES(1,30,4);
insert into  scores (s_id,score,c_id)VALUES(1,76,5);

insert into  scores (s_id,score,c_id)VALUES(2,35,1);
insert into  scores (s_id,score,c_id)VALUES(2,86,2);
insert into  scores (s_id,score,c_id)VALUES(2,45,3);
insert into  scores (s_id,score,c_id)VALUES(2,94,4);
insert into  scores (s_id,score,c_id)VALUES(2,79,5);

insert into  scores (s_id,score,c_id)VALUES(3,65,2);
insert into  scores (s_id,score,c_id)VALUES(3,85,3);
insert into  scores (s_id,score,c_id)VALUES(3,37,4);
insert into  scores (s_id,score,c_id)VALUES(3,79,5);

insert into  scores (s_id,score,c_id)VALUES(4,66,1);
insert into  scores (s_id,score,c_id)VALUES(4,39,2);
insert into  scores (s_id,score,c_id)VALUES(4,85,3);

insert into  scores (s_id,score,c_id)VALUES(5,66,2);
insert into  scores (s_id,score,c_id)VALUES(5,89,3);
insert into  scores (s_id,score,c_id)VALUES(5,74,4);


insert into  scores (s_id,score,c_id)VALUES(6,80,1);
insert into  scores (s_id,score,c_id)VALUES(6,56,2);
insert into  scores (s_id,score,c_id)VALUES(6,95,3);
insert into  scores (s_id,score,c_id)VALUES(6,30,4);
insert into  scores (s_id,score,c_id)VALUES(6,76,5);

insert into  scores (s_id,score,c_id)VALUES(7,35,1);
insert into  scores (s_id,score,c_id)VALUES(7,86,2);
insert into  scores (s_id,score,c_id)VALUES(7,45,3);
insert into  scores (s_id,score,c_id)VALUES(7,94,4);
insert into  scores (s_id,score,c_id)VALUES(7,79,5);

insert into  scores (s_id,score,c_id)VALUES(8,65,2);
insert into  scores (s_id,score,c_id)VALUES(8,85,3);
insert into  scores (s_id,score,c_id)VALUES(8,37,4);
insert into  scores (s_id,score,c_id)VALUES(8,79,5);

insert into  scores (s_id,score,c_id)VALUES(9,66,1);
insert into  scores (s_id,score,c_id)VALUES(9,39,2);
insert into  scores (s_id,score,c_id)VALUES(9,85,3);
insert into  scores (s_id,score,c_id)VALUES(9,79,5);

insert into  scores (s_id,score,c_id)VALUES(10,66,2);
insert into  scores (s_id,score,c_id)VALUES(10,89,3);
insert into  scores (s_id,score,c_id)VALUES(10,74,4);
insert into  scores (s_id,score,c_id)VALUES(10,79,5);
