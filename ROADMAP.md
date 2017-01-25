# Roadmap

### Legend:

* :x: Not Started
* :hourglass: WIP
* :white_check_mark: Complete

## @todo

* :white_check_mark: Add survivors to the database
    * Survivor data: name, age, gender, last location (latitude, longitude) and inventory :white_check_mark:.
    * Inventory data: water, food, medication and ammunition. :white_check_mark:
    * A Map to assign the last location (initially with the current location of the survivor) :white_check_mark:
* :white_check_mark: Update survivor location
    * A survivor will receive a unique identification from the system :white_check_mark:
    * Using that identification the survivors must be able to search for themselves and update the last location in a pratical way :white_check_mark:
* :white_check_mark: Flag survivor as infected
    * An infected survivor cannot trade with others :white_check_mark:
    * can't access/manipulate their inventory :white_check_mark:
    * nor be listed in the reports (and about listings) :question:
    * search for a survivor by name to flag that survivor as infected :white_check_mark:
* :white_check_mark: A survivor is marked as infected when at least three other survivors report their contamination
    * When a survivor is infected, their inventory items become inaccessible (they cannot trade with others) :white_check_mark:
    * it's expected to being possible to search for a survivor by name to flag that survivor as infected. :white_check_mark:
* :white_check_mark: Survivors cannot Add/Remove items from inventory
    * Their belongings must be declared when they are first registered in the system :white_check_mark:
    * They can only change their inventory by means of trading with other survivors. :white_check_mark:
* :hourglass: Trade items
    * Survivors can trade items among themselves.
    * they must respect the table price.
    * Both sides of the trade should offer the same amount of points.
    * the items will be transferred from one survivor to the other.
* :white_check_mark: Reports
    * Percentage of infected survivors. :white_check_mark:
    * Percentage of non-infected survivors. :white_check_mark:
    * Average amount of each kind of resource by survivor (e.g. 5 waters per survivor) :white_check_mark:
    * Points lost because of infected survivor. :white_check_mark:
    
