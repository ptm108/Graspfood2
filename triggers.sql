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


CREATE OR REPLACE FUNCTION update_reward_points()
RETURNS TRIGGER AS $$
    BEGIN
        UPDATE customer SET rewardpoints = rewardpoints -     
        NEW.rewardpointsused + (NEW.totalprice * 100) 
        WHERE uid = NEW.uid;
    Return null;
END;
$$ LANGUAGE plpgsql ;

DROP TRIGGER IF EXISTS update_reward_points_trigger ON orderplaced;
CREATE TRIGGER update_reward_points_trigger
    AFTER INSERT
    ON orderplaced
    FOR EACH ROW
EXECUTE PROCEDURE update_reward_points();


CREATE OR REPLACE FUNCTION update_delivery_rider_rating()
RETURNS TRIGGER AS $$
    BEGIN
        UPDATE deliveryrider SET deliveryriderrating = (SELECT 
        AVG(deliveryriderrating) FROM delivers) 
        WHERE uid = NEW.uid;
    Return null;
END;
$$ LANGUAGE plpgsql ;

DROP TRIGGER IF EXISTS update_delivery_rider_rating_trigger ON delivers;
CREATE TRIGGER update_delivery_rider_rating_trigger
    AFTER UPDATE OF deliveryservicerating
    ON delivers
    FOR EACH ROW
EXECUTE PROCEDURE update_delivery_rider_rating();


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


CREATE OR REPLACE FUNCTION must_not_exceed_a_certain_hour() RETURNS TRIGGER AS $$
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

DROP TRIGGER exceed_schedule_trigger ON Works;
CREATE TRIGGER exceed_schedule_trigger
AFTER INSERT 
ON Works 
FOR EACH ROW
EXECUTE FUNCTION must_not_exceed_a_certain_hour();

BEGIN TRANSACTION;
INSERT INTO WORKS(UID, DAYNO, STARTNO, ENDNO, HOURS, TIMESTAMP) VALUES (57, 4, 13,17, 4, '2020-04-13 08:25:00.277269');
UPDATE DeliveryRider 
SET totalWorkHours = totalWorkHours + (SELECT hours FROM Works w WHERE w.uid = DeliveryRider.uid)
WHERE DeliveryRider.uid = 57;
COMMIT;


CREATE OR REPLACE FUNCTION has_5_rider_per_hour(CURRDAY INTEGER, STARTHR INTEGER, ENDHR INTEGER)
    RETURNS BOOLEAN as $$
DECLARE
    curr INTEGER := 0;
    c INTEGER;
    newstart INTEGER;
    newend INTEGER;
BEGIN 
    LOOP
        newstart := STARTHR + curr;
        newend := newstart + 1;
        EXIT WHEN newend > ENDHR;

        SELECT COUNT(*) INTO c
        FROM Works w
        WHERE w.dayno = CURRDAY
        AND w.startno <= STARTHR
        AND w.endno > ENDHR
        AND EXTRACT(WEEK from w.timestamp) = EXTRACT(WEEK from NOW()); 
        
        IF (c <= 5) THEN
            RETURN FALSE;
        END IF;

        curr := curr + 1;

    END LOOP;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;


