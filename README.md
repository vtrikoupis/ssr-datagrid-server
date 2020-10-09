# ssr-datagrid

## Objectives
- With a userId and a gridId define a grid for the current user that is logged in
- dynamically create columns and rows
- createStore definition
  - deleteUrl (and deleteMethod e.g. POST)
  - insertUrl (and insertMethod e.g. POST)
- sample url: module.client.com/api/identity-server/grid
  - depending on the user who is logged in show the grid for identity-server setting(s)
    - columns of settings for rows of users
    - Request - module.client.com/api/identity-server/grid body: { bearer token }
            - for example u_id = 1 -> full CRUD
    - Response in 2 parts, an object for the grid structure and an object for the data
    1) 

    ```JSON
    {
      columns: {
        uid: {
          options: {
            sorting: true, 
            filtering: true
          } 
        },
        uname: {
          options: {
            sorting: true, 
            filtering: true
          } 
        }
      }
    }
    ```

    2) 

    ```JSON
    { 
      0:
        { 
          uid: "", 
          uname: ""
        },
    }, 
    ```