-- 创建用户
create user 'stazxr'@'%' identified by 'root';
-- 修改密码
set password for 'stazxr'@'%' = 'talent';
-- 授权
grant all on `stazxrDB`.`user` to 'stazxr'@'%';
grant select,insert,update,delete,create on `stazxrDB`.`user` to 'stazxr'@'%';
-- 授权所有的表
grant all on `stazxrDB`.* to 'stazxr'@'%';
-- 撤销授权
revoke all on `stazxrDB`.`user` from 'stazxr'@'%';
revoke all on `stazxrDB`.* from 'stazxr'@'%';
revoke select,insert,update,delete,create on `stazxrDB`.`user` from 'stazxr'@'%';
-- 查看授权
show grants for 'stazxr'@'%';
-- 删除用户
drop user 'stazxr'@'%';
