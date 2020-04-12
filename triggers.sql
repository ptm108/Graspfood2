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


Create or replace function  must_not_exceed_a_certain_hour() returns trigger as $$
DECLARE
	total INTEGER;

BEGIN
	SELECT totalWorkHours
	INTO total
FROM DeliveryRider dr
WHERE dr.uid = new.uid;

IF total > 48
THEN
RAISE EXCEPTION 'Sorry, total hours has exceeded 48 hours';

	END IF;
RETURN NEW;
END;
$$ language plpgsql;

Drop trigger exceed_schedule_trigger on Works;
Create trigger exceed_schedule_trigger
AFTER insert 
on Works 
For each row
Execute function must_not_exceed_a_certain_hour();

BEGIN TRANSACTION;
INSERT INTO WORKS(UID, DAYNO, STARTNO, ENDNO, HOURS) VALUES (57, 4, 14,16, 2);
UPDATE DeliveryRider 
SET totalWorkHours = totalWorkHours + (SELECT hours FROM Works w WHERE w.uid = DeliveryRider.uid)
WHERE DeliveryRider.uid = 57;
COMMIT;
