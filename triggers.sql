Create or replace function Update_current_num_of_orders()
Returns trigger as $$
    Begin
        Update fooditem set currentnumoforders = currentnumoforders + NEW.qty where fid = NEW.fid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_num_of_orders_trigger on contains;
Create trigger update_num_of_orders_trigger
    After insert
    on contains
    For each row
Execute procedure Update_current_num_of_orders();


Create or replace function update_reward_points()
Returns trigger as $$
    Begin
        Update customer set rewardpoints = rewardpoints - NEW.rewardpointsused where uid = NEW.uid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_reward_points_trigger on orderplaced;
Create trigger update_reward_points_trigger
    After insert
    on orderplaced
    For each row
Execute procedure update_reward_points();