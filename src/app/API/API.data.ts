

export const API_DATA:any = [
      {
      title: 'Statistics',
      description: 'Get Statistics',
      method: 'GET',
      url: '/delegateswebsitegetstatistics',
      result: [
        { "name": "most_total_rounds_delegate_name",
          "desc": "The delegate that has the most total rounds"
        },{
          "name": "most_total_rounds",
          "desc": "The most total rounds by a delegate"
        },{
          "name": "best_block_verifier_online_percentage_delegate_name",
          "desc": "The delegate that has the best block verifier online percentage"
        },{
          "name": "best_block_verifier_online_percentage",
          "desc": "The best block verifier online percentage by a delegate"
        },{
          "name": "most_block_producer_total_rounds_delegate_name",
          "desc": "The delegate that has been the block producer the most"
        },{
          "name": "most_block_producer_total_rounds",
          "desc": "The most block producer total rounds by a delegate"
        },{
          "name": "current_block_height",
          "desc": "The current block height"
        },{
          "name": "XCASH_DPOPS_round_number",
          "desc": "The current xcash proof of stake round number"
        },{
          "name": "total_votes",
          "desc": "The total amount of votes"
        },{
          "name": "XCASH_DPOPS_circulating_percentage",
          "desc": "The percentage of total votes compared to the circulating supply"
        }
      ],
      response: `
                {
                  "most_total_rounds_delegate_name":"delegate_name_5",
                  "most_total_rounds":"5",
                  "best_block_verifier_online_percentage_delegate_name":"delegate_name_2",
                  "best_block_verifier_online_percentage":"100",
                  "most_block_producer_total_rounds_delegate_name":"delegate_name_4",
                  "most_block_producer_total_rounds":"2",
                  "current_block_height":"521855",
                  "XCASH_DPOPS_round_number":"5",
                  "total_votes":"380000000",
                  "XCASH_DPOPS_circulating_percentage":"0"
                }
                `.trim()
      },{
      title: 'Get Delegates',
      description: 'Get a list of all delegates',
      method: 'GET',
      url: '/getdelegates',
      result: [
        {
          "name":"total_vote_count",
          "desc":"The total amount staked towards the delegate"
        },{
          "name":"delegate_name",
          "desc":"The delegates name"
        },{
          "name":"shared_delegate_status",
          "desc":"True if this is a delegate that wants users to vote for them, false is this delegate does not want users to vote for them"
        },{
          "name":"delegate_fee",
          "desc":"The fee in a percent"
        },{
          "name":"block_verifier_score",
          "desc":"How many invalid reserve proofs the delegate has found"
        },{
          "name":"online_status",
          "desc":"The current online status of the delegate"
        },{
          "name":"block_verifier_total_rounds",
          "desc":"The total rounds the delegate has been a block verifiers"
        },{
          "name":"block_verifier_online_percentage",
          "desc":"The total amount of rounds they were a block verifier and online / the total amount of rounds they were a block verifier"
        }
      ],
      response: `[
        {
        "total_vote_count":"200000000",
        "delegate_name":"delegate_name_5",
        "shared_delegate_status":"false",
        "delegate_fee":"0.100000",
        "block_verifier_score":"0",
        "online_status":"true",
        "block_verifier_total_rounds":"5",
        "block_verifier_online_percentage":"0"
      },
      {
          "total_vote_count":"100000000",
        "delegate_name":"delegate_name_4",
        "shared_delegate_status":"false",
        "delegate_fee":"",
        "block_verifier_score":"0",
        "online_status":"true",
        "block_verifier_total_rounds":"4",
        "block_verifier_online_percentage":"25"
      }
    ]
      `.trim()
    },
    {
      title: 'Get Delegates Statistics',
      description: 'Get a delegates statistics',
      method: 'GET',
      url: '/getdelegatesstatistics',
      parameters: [
        { "name": "parameter1",
          "desc": " The delegates public address, or the delegates name."
        }
      ],
      result: [
        {
          "name": "public_address",
          "desc": "The public address of the delegate"
        },{
          "name": "total_vote_count",
          "desc": "The total votes staked towards the delegate"
        },{
          "name": "total_vote_count_number",
          "desc": "Same as the total_vote_count"
        },{
          "name": "IP_address",
          "desc": "The delegates IP address, or a domain name"
        },{
          "name": "delegate_name",
          "desc": "The delegates name"
        },{
          "name": "about",
          "desc": "About (optional"
        },{
          "name": "website",
          "desc": "Website (optional"
        },{
          "name": "team",
          "desc": "Team (optional"
        },{
          "name": "shared_delegate_status",
          "desc": "True if this is a delegate that wants users to vote for them, false is this delegate does not want users to vote for them"
        },{
          "name": "delegate_fee",
          "desc": "The fee in a percent"
        },{
          "name": "server_specs",
          "desc": "Server settings (optional"
        },{
          "name": "block_verifier_score",
          "desc": "How many invalid reserve proofs the delegate has found"
        },{
          "name": "online_status",
          "desc": "The current online status of the delegate"
        },{
          "name": "block_verifier_total_rounds",
          "desc": "The total rounds the delegate has been a block verifiers"
        },{
          "name": "block_verifier_online_total_rounds",
          "desc": "The total rounds the delegate has been online and a block verifier"
        },{
          "name": "block_verifier_online_percentage",
          "desc": "The total amount of rounds they were a block verifier and online / the total amount of rounds they were a block verifier"
        },{
          "name": "block_producer_total_rounds",
          "desc": "The total rounds the deelgate has been the block producer"
        },{
          "name": "block_producer_block_heights",
          "desc": "The block heights that the delegate has found"
        },{
          "name": "current_delegate_rank",
          "desc": "The current delegate rank"
        }
      ],
      response: `
      {
        "public_address":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3",
        "total_vote_count":"1000000",
        "total_vote_count_number":"10.0",
        "IP_address":"127.0.0.1",
        "delegate_name":"delegatename1",
        "about":"About",
        "website":"Website",
        "team":"Team",
        "shared_delegate_status":"false",
        "delegate_fee":"1",
        "server_specs":"server_specs",
        "block_verifier_score":"1",
        "online_status":"true",
        "block_verifier_total_rounds":"40",
        "block_verifier_online_total_rounds":"38",
        "block_verifier_online_percentage":"100",
        "block_producer_total_rounds":"7",
        "block_producer_block_heights":"2813049|10|15|240503|240507",
        "current_delegate_rank":"100"
      }
      `.trim()
    },
    {
      title: 'Get Delegates Information',
      description: 'Get informations about a delegate',
      method: 'GET',
      url: '/getdelegatesinformation',
      parameters: [
        { "name": "parameter1",
          "desc": " The delegates public address, or the delegates name."
        }
      ],
      result: [
        {
          "name": "public_address",
          "desc": "The public address of the delegateAbout (optional)"
        },{
          "name": "website",
          "desc": "Website (optional)"
        },{
          "name": "team",
          "desc": "Team (optional)"
        },{
          "name": "shared_delegate_status",
          "desc": "True if this is a delegate that wants users to vote for them, false is this delegate does not want users to vote for them"
        },{
          "name": "delegate_fee",
          "desc": "The fee in a percent"
        },{
          "name": "server_specs",
          "desc": "Server settings (optional)"
        }

      ],
      response: `
      {
        "public_address":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP",
        "total_vote_count":"10000000",
        "delegate_name":"delegate_name_1",
        "about":"",
        "website":"",
        "team":"",
        "shared_delegate_status":"false",
        "delegate_fee":"",
        "server_specs":"",
        "block_verifier_score":"0",
        "online_status":"true",
        "block_verifier_total_rounds":"1",
        "block_verifier_online_total_rounds":"0",
        "block_verifier_online_percentage":"0",
        "block_producer_total_rounds":"0",
        "block_producer_block_heights":"",
        "current_delegate_rank":"5"
      }
      `.trim()
    },
    {
      title: 'Get Delegates Voters List',
      description: 'Get a list of all delegates staking towards the shared delegate',
      method: 'GET',
      url: '/getdelegatesvoterslist',
      parameters: [
        {
          "name": "parameter1",
          "desc": "The public address of the shared delegate."
        }
      ],
      result: [
        {
          "name": "public_address_created_reserve_proof",
          "desc": "The public address of the delegate that is staking towards the shared delegate"
        },{
          "name": "public_address_voted_for",
          "desc": "The public address of the shared delegate"
        },{
          "name": "total",
          "desc": "The total amount of the reserve proof"
        },{
          "name": "reserve_proof",
          "desc": "The reserve proof created by the delegate"
        }
      ],
      response: `
      [
        {
          "public_address_created_reserve_proof":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP",
          "public_address_voted_for":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP",
          "total":"120000000",
          "reserve_proof":"ReserveProofV11BZ23sBt9sZJeGccf84mzyAmNCP3KzYbE1111112VKmH111118NDPqYHviiubTHpa5jPey2PF2RPr7p92nUY5PYcCqPwkM3Vezb1BvSAu2zX5kKMuJYo2q837KH4HAXkXbdgF6wa13pkkpuMxv74keNZLAeeM9wmSuJvSHmMvVjfo6u6iCWMDRESRouQ359NvpAZN71D9fSivgK7K7WkbNzftkUZ6V7Uza6K9eihTgu7hSB3AqaTm7cK9uTb5Fzg9LyJbC4phfGYM7bazM2UrVfitZtbEkKuhPxnzFzKkWtdYBB59zUo1uS4UUR8faS25sjfc2cPjZUfbEZsiJVo7EDNs3d1KdhTN5TdNxZK6MZgVB77jE9ed4jJUrNSrqfWg1BwigbN9smQicoi9yYwujuGaHEzEnLBwQeLFxJJQj31qRQb4ZijEBGrMxvcmybhPKiHA3LBARnBREJxkQ39dp2HRfEfR1G7z6RGhS9o1KQCF3MAwomCMCuj69SpeovPEYwQb5uVXti"
        },
        {
          "public_address_created_reserve_proof":"XCA1v18Qsf5PKLr8GFr14jHkjgf3mPm1MAVbswBs9QP7FwGTLCE4SwYi81BRp2vrcV12maMtCw9TE1NZRVyynQ3e2c3b7mxRw3",
          "public_address_voted_for":"XCA1pEWxj2q7gn7TJjae7JfsDhtnhydxsHhtADhDm4LbdE11rHVZqbX5MPGZ9tM7jQbDF4VKK89jSAqgL9Nxxjdh8RM5JEpZZP",
          "total":"200000000",
          "reserve_proof":"ReserveProofV11BZ23sBt9sZJeGccf84mzyAmNCP3KzYbE1111112VKmH111118NDPqYHviiubTHpa5jPey2PF2RPr7p92nUY5PYcCqPwkM3Vezb1BvSAu2zX5kKMuJYo2q837KH4HAXkXbdgF6wa13pkkpuMxv74keNZLAeeM9wmSuJvSHmMvVjfo6u6iCWMDRESRouQ359NvpAZN71D9fSivgK7K7WkbNzftkUZ6V7Uza6K9eihTgu7hSB3AqaTm7cK9uTb5Fzg9LyJbC4phfGYM7bazM2UrVfitZtbEkKuhPxnzFzKkWtdYBB59zUo1uS4UUR8faS25sjfc2cPjZUfbEZsiJVo7EDNs3d1KdhTN5TdNxZK6MZgVB77jE9ed4jJUrNSrqfWg1BwigbN9smQicoi9yYwujuGaHEzEnLBwQeLFxJJQj31qRQb4ZijEBGrMxvcmybhPKiHA3LBARnBREJxkQ39dp2HRfEfR1G7z6RGhS9o1KQCF3MAwomCMCuj69SpeovPEYwQb5uVXti"
        }
      ]
      `.trim()
    },
    {
      title: 'Get round statistics',
      description: 'Get round statistics',
      method: 'GET',
      url: '/getroundstatistics',
      parameters: [
        {
          "name": "parameter1",
          "desc": " The block height"
        }
      ],
      result: [
        {
          "name": "reserve_bytes",
          "desc": "The complete block that contains all of the reserve bytes"
        },
      ],
      response: `
      {
        "reserve_bytes":"reserve_bytes"}
      }
      `.trim()
    }
    ];
