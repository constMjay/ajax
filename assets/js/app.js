$(document).ready((e) => {
    /**
     * Display Data 
     */
    fetchUser();

    /**
     * Post User's Data
     */
    $('#myForm').submit(async (e) => {
        e.preventDefault();

        const response = await fetch('/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: $('#name').val(),
                age: $('#age').val(),
                gender: $('#gender').val()
            })
        });
        const result = await response.json();
        //Fetch the data with update new post user's and display in table
        if (result) fetchUser();

    });


    /**
     * Delete User's
     */
    const userTable = $('#userTable');
    userTable.on('click', '.btnDelete', async (e) => {
        const tableRowId = e.target.parentElement.parentElement.id;

        const response = await fetch('/user', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: tableRowId
            })
        });
        const result = await response.json();
        console.log(result)
        //Fetch the data with update new post user's which is deleted and display in table
        if (result) fetchUser();
    })
});

/**
 * Get User's To Database and if Success Create Table
 */
async function fetchUser() {
    const response = await fetch('/user');
    const { users } = await response.json();
    let output = "";
    users.forEach((user) => {
        output += `
        <tr class="text-center" id="${user._id}">
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>
             <button class="btn btn-warning btn-sm btnDelete">Delete</button>
            </td>
        </tr>
        `
        return output
    });
    $('#userOutput').html(output)
}