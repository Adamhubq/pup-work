
import * as oracledb from "oracledb";

export interface CreateImg {
    ARTICLE: string;
    PATH: string;
    FILENAME: string;
    initialObjectconstructor();
    getCollection(collection);
    setCollection();
    loopScraping(loopScraping);
    objectConnection: oracledb.Connection;
    dbObjectClassProtoGet: oracledb.DBObject;
    dbObjectClassProtoSet: oracledb.DBObject;
    collection: object;
    closeConnectDatabase();
}

export class DataBaseOracleAccess implements CreateImg {
    ARTICLE: string;
    PATH: string;
    FILENAME: string;

    objectConnection: oracledb.Connection;
    dbObjectClassProtoGet: oracledb.DBObject;
    dbObjectClassProtoSet: oracledb.DBObject;
    collection: any;

    async initialObjectconstructor() { // initialization in promis or await (create new function with async)       
        await oracledb.createPool({
            poolAlias: '54a975e6a85b0515f938e46d9b04bf94d9',
            user: "webdb",
            password: "webdb",
            connectString: "PORTAL"
        }).then(async () => {
            await oracledb.getConnection('54a975e6a85b0515f938e46d9b04bf94d9')
                .then(async conn => {
                    this.objectConnection = conn;
                    await conn.getDbObjectClass("webdb.p_items_images_t_type")
                        .then(dbObjects => {
                            this.dbObjectClassProtoGet = new dbObjects({});
                            this.dbObjectClassProtoSet = new dbObjects({});
                            // console.log(dbObjects.prototype)
                        })
                });
        });

    }

    async getCollection(collection: []) {

        collection.map(value => this.dbObjectClassProtoGet.append(value))
        await this.objectConnection
            .execute('BEGIN :cursor := webdb.DB_API_SCRAP.get_item_images(:p_param); END;',   // *sql param
                {                                                                             // *bindvar param
                    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 },
                    p_param: { dir: oracledb.BIND_IN, type: 2023, val: this.dbObjectClassProtoGet }
                },
                { outFormat: oracledb.OUT_FORMAT_OBJECT })
            .then(async (resp: any) => {
                await resp.outBinds.cursor.getRows(400).then((async response => {
                    response.map(value => this.dbObjectClassProtoSet.append(value));
                    console.log('asdasd')
                }))
                    .catch(err => console.log(err))
                    .finally(async () => {
                        console.log('asdasd')
                        await resp.outBinds.cursor.close()
                        console.log('asdasd')
                    });

            })
            console.log('asdasd')

    }

    async setCollection() {
        await this.objectConnection
            .execute('BEGIN :cursor := webdb.DB_API_SCRAP.set_item_images(:p_param); END;',   // *sql param
                {                                                                             // *bindvar param
                    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 },
                    p_param: { dir: oracledb.BIND_IN, type: 2023, val: this.dbObjectClassProtoSet }
                }).then(async (resp: any) => {
                    await resp.outBinds['cursor'].getRows(400)
                        .then((response) => {
                            console.log('response')
                            console.log(response)
                            console.log('response')
                        })
                        .catch(err => console.log(err))
                        .finally(async () => {
                            await resp.outBinds.cursor.close()
                        });
                })
    }

    async loopScraping(collectionGroup) {
        if (!Object.keys(collectionGroup).length)
            return console.log("null collection group");

        await this.getCollection(collectionGroup)
            .then(async () => await this.setCollection())
            .catch((err) => console.log(err))
    }

    async closeConnectDatabase() {
        await this.objectConnection.close();
    }
}

// (async () => {
//     //     await oracledb.createPool({
//     //         poolAlias: 'asdasdadsa',
//     //         user: "webdb",
//     //         password: "webdb",
//     //         connectString: "PORTAL"
//     //     });
//     //     const connection = await oracledb.getConnection('asdasdadsa');

//     //     // -----------------------------------------------------------------------------------------------------
//     //     const dbObjectClassProto = await connection.getDbObjectClass("webdb.p_items_images_t_type");

//     //     let newObject = new dbObjectClassProto({});


//     //     // initial and create
//     //     const testOng = {
//     //         ARTICLE: 'test',
//     //         PATH: 'test',
//     //         FILENAME: 'test'
//     //     }

//     //     newObject.append(testOng);
//     //     newObject.append(testOng);
//     //     newObject.append(testOng);

//     // await connection.execute('BEGIN :cursor := webdb.DB_API_SCRAP.get_item_images(:p_param); END;',   // *sql param
//     //     {                                                                             // *bindvar param
//     //         cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 },
//     //         p_param: { dir: oracledb.BIND_IN, type: 2023, val: newObject }
//     //     }).then(async (resp: any) => {
//     //         await resp.outBinds.cursor.getRows(400).then((async response => {
//     //             console.log("response");
//     //             console.log(response);
//     //         }))
//     //     })

//     // awaitdbObjectClassProto
//     //     .execute('BEGIN :cursor := webdb.DB_API_SCRAP.set_item_images(:p_param); END;',   // *sql param
//     //         {                                                                             // *bindvar param
//     //             cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 },
//     //             p_param: { dir: oracledb.BIND_IN, type: 2023, val: collection }
//     //         }).then(async resp => {
//     //             console.log("resp");
//     //             console.log(resp);
//     //             await resp.outBinds['cursor'].getRows(400)
//     //                 .then(async (response) => {
//     //                     console.log("response");
//     //                     console.log(response);
//     //                 })
//     //                 .catch(err => console.log(err))


//     const objects = new DataBaseOracleAccess();
//     await objects.initialObjectconstructor();

//     await objects.getCollection({
//         ARTICLE: 'test',
//         PATH: 'test',
//         FILENAME: 'test'
//     })

//     // const bindvars = {
//     //     cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 },
//     //     p_param: { dir: oracledb.BIND_IN, type: 2023, val: newObject }
//     // }

// })()
    // const testObject: CreateImg = new DataBaseOracleAccess();

    // await testObject.initialObjectconstructor()
    // await testObject.loopScraping({
    //     ARTICLE: 'test',
    //     PATH: 'test',
    //     FILENAME: 'test'
    // })
    // console.log(testObject.dbObjectClassProto);
    // await testObject.closeConnectDatabase();

    // console.log(testObject.collection);

    // console.log(dbObjectClassProto)
    // console.log(objectConnection)





    // await obj.loopScraping({
    //     ARTICLE: 'test',
    //     PATH: 'test',
    //     FILENAME: 'test'
    // })




    // ARTICLE: string;
    // PATH: string;
    // FILENAME: string;
    // initialObjectconstructor();
    // getCollection(collection);
    // setCollection();
    // loopScraping(loopScraping);
    // objectConnection: oracledb.Connection;
    // dbObjectClassProto: oracledb.DBObject;
    // collection: object;






    // await oracledb.getConnection('asdasdadsa', async (_err, conn) => {
    //     if (_err) {
    //         console.log(_err);
    //         this.doRelease(conn);
    //     } else {
    //         // record
    //         const testOng = {
    //             ARTICLE: 'test',
    //             PATH: 'test',
    //         }

    //         // table

    //         const obj = await conn.getDbObjectClass("webdb.p_items_images_t_type");

    //         let newObject = new obj({
    //             ARTICLE: 'test',
    //             PATH: 'test',
    //         });
    //         newObject.append(testOng);
    //         newObject.append(testOng);
    //         newObject.append(testOng);

    //         const bindvars = {
    //             cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 },
    //             p_param: { dir: oracledb.BIND_IN, type: 2023, val: newObject }
    //         }

    //         const result = await conn.execute('BEGIN :cursor := webdb.DB_API_SCRAP.set_item_images(:p_param); END;', bindvars);
    //         let ResultSet = result.outBinds['cursor'];

    //         const rows = await ResultSet.getRows(5000);

    //         await ResultSet.close()

    //         console.log(rows);
    //     }
    // });
// })()
//                 // { outFormat: oracledb.OBJECT } )
//                 // .then((result: any) => {        
//                 //     let ResultSet = result.outBinds['cursor'];         

//                 // });    



//                 /*     error: oracledb.DBError ,  dbObject: oracledb.DBObjectClass ) => {



//                 } );         */



// /*          


//             } 
//         // const object_ = await conn.getDbObjectClass('p_items_images_t_type');
//         // let bindvars = new Object();
//         // const newObject = new object_();
//         // const testOng = {
//         //     ARTICLE: 'test',
//         //     PATH: 'test',
//         // }
//         // await newObject.append(testOng);
//         // await newObject.append(testOng);
//         // await newObject.append(testOng);
//         // bindvars['cursor'] = { type: oracledb.CURSOR, dir: oracledb.BIND_OUT, maxSize: 5000 };
//         // bindvars['p_param'] = { dir: oracledb.BIND_IN, type: 2023, val: newObject };

//         // const result = await conn.execute('BEGIN :cursor := webdb.DB_API_SCRAP.set_item_images(:p_param); END;', bindvars, { resultSet: true });
//         // console.log(result.outBinds.cursor.resultSet)
//         // console.log(object_)
//         // const ot = await result.outBinds.cursor.resultSet.getRows();
//         // ot.map(val => console.log(val));
//     });

//     // console.log(object_.prototype)







//     // console.log('------');
//     // console.log(Object.assign({}, newObject.getValues()));
//     // // console.log('------');

//     // const objectBind = {
//     //     dir: oracledb.BIND_IN,
//     //     maxSize: 5000,
//     //     type: oracledb.CURSOR,
//     //     val: newObject
//     // };






//     // const res =  await conn.outBinds['cursor'].getRows(10);
//     // const response = await res;
//     // console.log(conn);
//     // 


//     // console.log(newObject)

//    // await connection.close();
//     // console.log(sss)

//     // connection.execute(`FUNCTION set_item_images(${newObject}) RETURN SYS_REFCURSOR`)
//     //     .then(resp => console.log(resp))
//     //     .catch(err => console.log(err))

//     // await connectPoll.close();

// })()


// // export const testObject = oracledb.getConnection({
// //     user: "webdb",
// //     password: "webdb",
// //     connectString: "PORTAL"
// // });
// // testObject
// //     .then(async (response) => {
// //         let dbObjects = await response.getDbObjectClass("p_items_images_t_type");
// //         // let objects = await new dbObjects.prototype.elementTypeClass();

// //         console.log(dbObjects.prototype);

//         // dbObjects.prototype.append({
//         //     ARTICLE: 'test',
//         //     PATH: 'test'
//         // });
//     // })
// //     .catch(error => console.log(error));
// // export const attributes = {
// //     ARTICLE: {
// //         type: 2001,
// //         typeName: 'VARCHAR2'
// //     },
// //     PATH: {
// //         type: 2001,
// //         typeName: 'VARCHAR2'
// //     }
// // }
