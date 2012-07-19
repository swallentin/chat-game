Create a view array that will render the "active view".

Create a views object that will store name of "view", this will contain a list of views.
The views will trigger events after the actions it's responsible for has been triggered.
Decouple the rendering logic and move it into event triggers. These triggers will allow for
more easier debugging of interactive views.

		 ____________
		| ActionView |
		 ------------

		Action view is a coordinator. It will bind to it's child views events and trigger a change of it's active view.

		Action view will listen to events "/Step 1/success" or "/Step 2/success" of respective view. 
		These listeners will then change the activeView into the next step.

		 ____________
		| Step 1 View|
		 ------------
		 Step A view will be an interactive view that will create and react to internal events. All the actions of the view
		 will be trigger by events that an ActionView can listen to. 
		 Example.
		 User clicks Step A button, triggering event, "/Step 1/click"
		 View triggers internal changes and Step B button is presented.
		 User click Step B button, triggering event, "mygadgget/Step 2/click"
		 On Step B click event will trigger a new event, /success/ this will let the parent view that it's finished.
		 Also available is the fail event, "/Step 1/fail"

		 ____________
		| Step 2 View|
		 ------------