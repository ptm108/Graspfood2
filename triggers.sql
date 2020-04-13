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


Create or replace function Update_rider_state()
Returns trigger as $$
    Begin
        Update deliveryrider set isidle = false where uid = NEW.uid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_rider_state_trigger on contains;
Create trigger update_rider_state_trigger
    After insert
    on delivers
    For each row
Execute procedure Update_rider_state();


Create or replace function set_rider_state()
Returns trigger as $$
    Begin
        Update deliveryrider set isidle = true where uid = NEW.uid and NEW.riderdelivertime is not null
;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists set_rider_state_trigger on delivers;
Create trigger set_rider_state_trigger
    After update of riderdelivertime
    on delivers
    For each row
Execute procedure set_rider_state();


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
        Update deliveryrider set deliveryriderrating = (select avg(deliveryriderrating) from delivers) where uid = NEW.uid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_delivery_rider_rating_trigger on delivers;
Create trigger update_delivery_rider_rating_trigger
    After update of deliveryservicerating
    on delivers
    For each row
Execute procedure update_delivery_rider_rating();


-- Create or replace function set_delivery_rider_rating()
-- Returns trigger as $$
--     Begin
--         Update deliveryrider set deliveryriderrating = 5 where uid = NEW.uid;
--     Return null;
-- End;
-- $$ LANGUAGE plpgsql ;

-- Drop trigger if exists set_delivery_rider_rating_trigger on deliveryrider;
-- Create trigger set_delivery_rider_rating_trigger
--     After insert
--     on deliveryrider
--     For each row
-- Execute procedure set_delivery_rider_rating();

Create or replace function update_restaurant_rating()
Returns trigger as $$
    Begin
        Update restaurant set rating = (select avg(rating) from reviews) where rid = NEW.rid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_restaurant_rating_trigger_insert on reviews;
Create trigger update_restaurant_rating_trigger_insert
    After insert
    on reviews
    For each row
Execute procedure update_restaurant_rating();

Drop trigger if exists update_restaurant_rating_trigger_update on reviews;
Create trigger update_restaurant_rating_trigger_update
    After update of rating
    on reviews
    For each row
Execute procedure update_restaurant_rating();

