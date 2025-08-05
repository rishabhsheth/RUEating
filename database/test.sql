CREATE OR REPLACE FUNCTION query_food(f VARCHAR(250))
RETURNS TABLE (
  Name VARCHAR(250),
  Location VARCHAR(20),
  Meal VARCHAR(10),
  Day TEXT
)
AS $$
  SELECT 
    Name,
    Location,
    Meal,
    TO_CHAR(Day, 'FMDay, FMMonth DDth, YYYY') AS DayFormatted
  FROM (
    SELECT *, 
      CASE
        WHEN EXTRACT(DAY FROM Day) % 10 = 1 AND EXTRACT(DAY FROM Day) != 11 THEN 'st'
        WHEN EXTRACT(DAY FROM Day) % 10 = 2 AND EXTRACT(DAY FROM Day) != 12 THEN 'nd'
        WHEN EXTRACT(DAY FROM Day) % 10 = 3 AND EXTRACT(DAY FROM Day) != 13 THEN 'rd'
        ELSE 'th'
      END AS suffix
    FROM FOOD 
    WHERE Name ILIKE '%' || f || '%'
  ) sub
  ORDER BY 
    Name ASC,
    Location ASC,
    Day ASC,
    CASE 
      WHEN Meal = 'Breakfast' THEN 1
      WHEN Meal = 'Lunch' THEN 2
      WHEN Meal = 'Dinner' THEN 3
      ELSE 4
    END ASC
  LIMIT 1000;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION query_food_location(f VARCHAR(250), locations text[])
RETURNS TABLE (
  Name VARCHAR(250),
  Location VARCHAR(20),
  Meal VARCHAR(10),
  Day TEXT
)
AS $$
  SELECT 
    Name,
    Location,
    Meal,
    TO_CHAR(Day, 'FMDay, FMMonth DDth, YYYY') AS DayFormatted
  FROM (
    SELECT *, 
      CASE 
        WHEN EXTRACT(DAY FROM Day) % 10 = 1 AND EXTRACT(DAY FROM Day) != 11 THEN 'st'
        WHEN EXTRACT(DAY FROM Day) % 10 = 2 AND EXTRACT(DAY FROM Day) != 12 THEN 'nd'
        WHEN EXTRACT(DAY FROM Day) % 10 = 3 AND EXTRACT(DAY FROM Day) != 13 THEN 'rd'
        ELSE 'th'
      END AS suffix
    FROM FOOD 
    WHERE Name ILIKE '%' || f || '%'
      AND (locations IS NULL OR Location = ANY(locations))
      AND Day >= CURRENT_DATE
  ) sub
  ORDER BY 
    Day ASC,
    Name ASC,
    Location ASC,
    CASE 
      WHEN Meal = 'Breakfast' THEN 1
      WHEN Meal = 'Lunch' THEN 2
      WHEN Meal = 'Dinner' THEN 3
      ELSE 4
    END ASC
  LIMIT 1000;
$$ LANGUAGE SQL;
