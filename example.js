// Function to update target collection
async function updateTargetCollection() {
    try {
      const sourceCollectionSnapshot = await db.collection("dogs_reference").get();
      
      let updates = [];
      sourceCollectionSnapshot.forEach(doc => {
        const data = doc.data();
        const targetDocRef = db.collection("dogs_test").doc(doc.id);
        const updateData = {
          breed: data.breed,
        };
        updates.push(targetDocRef.update(updateData));
      });
  
      await Promise.all(updates);
      console.log("Target collection updated successfully.");
    } catch (error) {
      console.error("Error updating target collection:", error);
    }
  }
  
  // Function to query documents
  async function queryDogsTest() {
    const query = await db.collection("dogs_test")
      .limit(75)
      .get();
    return query;
  }
  
  // Main function to be called by Firefoo
  async function run() {
    await updateTargetCollection();
    const queryResult = await queryDogsTest();
    
    // Processing the query results if necessary
    queryResult.forEach(doc => {
      console.log(doc.id, "=>", doc.data());
    });
  
    return queryResult;
  }
  
  // Execute the main function
  run().then(queryResult => {
    console.log("Query completed successfully");
    // Handle the queryResult here if needed
  }).catch(error => {
    console.error("Error executing run function:", error);
  });
  