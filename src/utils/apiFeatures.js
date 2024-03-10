class ApiFeatures {
    constructor(mongooseQuery,data){
        this.mongooseQuery=mongooseQuery;
        this.data=data;
    }
    
    paginate(){
        let {page,size}=this.data
        if(!page || page<=0){
            page = 1
        }
        if(!size || size<=0){
            size = 3
        }
        const skip= (page-1)*size

        this.mongooseQuery=this.mongooseQuery.limit(size).skip(skip)
        return this
    }

    filter(){
        const excludeQuery={...this.data}

        const includeArray=['page','size','sort','search','fields']
        
        includeArray.forEach((ele)=>{
            delete excludeQuery[ele]
        })

        const filter = JSON.parse(

            JSON.stringify(excludeQuery)
           .replace(/(gt|gte|lt|lte|eq|ne|in|nin)/g,
            (match)=> `$${match}`))

         this.mongooseQuery=this.mongooseQuery.find(filter)
     return this;
    }

    sort(){
        if(this.data.sort){
         this.data.sort=this.data.sort.replaceAll(","," ")
         this.mongooseQuery=this.mongooseQuery.sort(this.data.sort)
        }
     return this;
    }

    fields(){
        if(this.data.fields){
         this.data.fields=this.data.fields.replaceAll(","," ")
         this.mongooseQuery=this.mongooseQuery.select(this.data.fields)
        }
     return this;
    }

    search(){
        if(this.data.fields){
        this.mongooseQuery=this.mongooseQuery.find({ 
            $or:[
                {name:{$regex:this.data.search}},
                {description:{$regex:this.data.search}}
            ]
        })
        }
     return this;
    }
 
}

export default ApiFeatures