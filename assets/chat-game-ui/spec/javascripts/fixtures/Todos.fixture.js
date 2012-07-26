beforeEach(function() {
  
  this.fixtures = {
    
    Todos: {
      valid: { // response starts here
        "status": "OK",
        "version": "1.0",
        "response": {
          "todos": [
            {
              "id": 1,
              "title": "Destroy Alderaan"
            },
            {
              "id": 2,
              "title": "Close exhaust port"
            }
          ]
        }
      } 
    }
    
  };
  
});