Create or replace function Update_current_num_of_orders()
Returns trigger as $$
    Begin
        Update fooditem set currentnumoforders = currentnumoforders + 1 where fid = NEW.fid;
    Return null;
End;
$$ LANGUAGE plpgsql ;

Drop trigger if exists update_num_of_orders_trigger on contains;
Create trigger update_num_of_orders_trigger
    After insert
    on contains
    For each row
Execute procedure Update_current_num_of_orders();
