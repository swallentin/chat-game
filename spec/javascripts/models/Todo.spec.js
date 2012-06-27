describe("Todo model", function () {

	beforeEach(function(){
			this.todo = new Todo({
				title: "Rake leaves"
			});
	});

	describe("when instantiated", function(){

		it("should exhibit attribute", function(){
			expect(this.todo.get("title")).toEqual("Rake leaves");
		});

		it("should set the priority by default", function() {
			expect(this.todo.get("priority")).toEqual(3);
		});


		describe("url", function() {
			beforeEach(function(){
				var collection = {
					url: "/collection"
				};
				this.todo.collection = collection;
			});
			
			describe("when no id is set", function() {
				it("should return the collection URL", function() {
					expect(this.todo.url()).toEqual("/collection");
				});
			});			

			describe("when id is set", function() {
				it("should return the collection URL and id", function() {
					this.todo.id = 1;
					expect(this.todo.url()).toEqual("/collection/1");
				});
			});	
					
			describe("validation and saving", function() {

				it("should not save when title is empty", function() {
					this.eventSpy = sinon.spy();
					this.todo.bind("error", this.eventSpy);
					this.todo.save({"title": ""});
					expect(this.eventSpy).toHaveBeenCalledOnce();
					expect(this.eventSpy).toHaveBeenCalledWith(
						this.todo,
						"cannot have an empty title"
					);
				});

			})

		});

	});



});