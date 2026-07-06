-- 创建用户
create user 'me.yuhiri'@'%' identified by 'root';
-- 修改密码
set password for 'me.yuhiri'@'%' = 'talent';
-- 授权
grant all on `me_yuhiriDB`.`user` to 'me.yuhiri'@'%';
grant select,insert,update,delete,create on `me_yuhiriDB`.`user` to 'me.yuhiri'@'%';
-- 授权所有的表
grant all on `me_yuhiriDB`.* to 'me.yuhiri'@'%';
-- 撤销授权
revoke all on `me_yuhiriDB`.`user` from 'me.yuhiri'@'%';
revoke all on `me_yuhiriDB`.* from 'me.yuhiri'@'%';
revoke select,insert,update,delete,create on `me_yuhiriDB`.`user` from 'me.yuhiri'@'%';
-- 查看授权
show grants for 'me.yuhiri'@'%';
-- 删除用户
drop user 'me.yuhiri'@'%';
