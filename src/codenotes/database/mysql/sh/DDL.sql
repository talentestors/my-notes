-- 创建作者表
create table author(
	`aut_id` int primary key,
	`aut_name` varchar(50) not null,
	`gander` char(1) default '男',
	`country` varchar(50),
	`birthday` datetime
-- primary key(aut_id,aut_name) 
);

-- 创建图书表
create table if not exists `stazxrDB`.`book`(
	`id` int primary key auto_increment,
	`name` varchar(50) not null,
	`bar_code` varchar(30) not null unique,
	`aut_id` int not null,
	foreign key (aut_id) references author(aut_id)
);
