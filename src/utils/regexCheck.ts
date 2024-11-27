export const RegexCheck=(string:string,category:string)=>{
   if (category==="tw") {
      return !/^(https:\/\/twitter.com\/[a-zA-Z0-9_]+)$/.test(string)
   }
   if (category==="discord"){
      // return !/^(https?:\/\/)?(www\.)?((discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z])$/.test(string)
      return !/https:\/\//.test(string)
   }
   if (category==="website"){
      return !/https:\/\//.test(string)
   }
   if (category==="mint_collectionID"){
      return !/0x/.test(string)
   }
}