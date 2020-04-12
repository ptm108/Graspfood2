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
        Update customer set rewardpoints = rewardpoints - NEW.rewardpointsused + (NEW.totalprice * 100) where uid = NEW.uid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_reward_points_trigger on orderplaced;
Create trigger update_reward_points_trigger
    After insert
    on orderplaced
    For each row
Execute procedure update_reward_points();


Create or replace function update_delivery_rider_rating()
Returns trigger as $$
    Begin
        Update deliveryrider set deliveryriderrating = (deliveryriderrating + NEW.deliveryservicerating) / 2 where uid = NEW.uid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_delivery_rider_rating_trigger on delivers;
Create trigger update_delivery_rider_rating_trigger
    After update
    on delivers
    For each row
Execute procedure update_delivery_rider_rating();


Create or replace function delete_old_schedule() 
Returns trigger as $$
    Begin
		Delete from works where uid = NEW.uid;
    Return null;
End;
$$ LANGUAGE plpgsql;

Drop trigger if exists remove_schedule on DeliveryRider;
Create trigger remove_schedule
    After update 
    Of timeForScheduleUpdate 
    on DeliveryRider
    For each row
When (NEW.timeForScheduleUpdate > OLD.timeForScheduleUpdate)
Execute procedure delete_old_schedule();
