import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { NexusGenFieldTypes, NexusGenRootTypes } from '..'

// query with param: id
const ResultQuery = gql`
  query getRoomById($roomId: String!) {
    roomById(id: $roomId) {
      id
      name
      createdAt
      endedAt
      tempResult {
        result {
          receiverId
          receiverDiscordId
          receiverName
          percent
        }
      }
      points {
        senderId
        receiverId
        point
      }
      gifters {
        accept
        gifter {
          id
          name
          discordId
        }
      }
    }
  }
`

type RenderData = {
  key: string
  senderId: number
  senderName: string
  receiverId: number
  point0?: number
  point1?: number
  point2?: number
  point3?: number
  point4?: number
  point5?: number
}

type PointSums = Map<number, number>

function composeData(points: Array<NexusGenRootTypes['Point'] | null>, gifters: NexusGenFieldTypes['Room']['gifters'], senderPointSums?: PointSums) {
  return points.reduce(
    (acc, cur) => {
      if(!cur) return acc
      const sender = gifters.find((g) => g?.gifter.id === cur.senderId)
      const receiver = gifters.find((g) => g?.gifter.id === cur.receiverId)
      
      const receiverIndex = gifters.findIndex((g) => g?.gifter.id === cur.receiverId)

      if (!sender || !receiver) return acc

      const sum = senderPointSums ? senderPointSums.get(cur.senderId) : 0
      if (senderPointSums && !sum) throw new Error('senderPointSums not found')
      
      const exist = acc.find((a) => a.senderId === cur.senderId)
      if (exist) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        exist[`point${receiverIndex.toString()}`] = (senderPointSums && sum) ? (cur.point / sum * 100).toFixed(2) + '%' : cur.point
        
        return acc
      }

      const senderIndex = gifters.findIndex((g) => g?.gifter.id === cur.senderId)
      acc.push({
        key: cur.receiverId + '-' + cur.senderId,
        senderId: cur.senderId,
        senderName: sender.gifter.name,// + '-' + sender.gifter.id,
        receiverId: receiver.gifter.id,
        [`point${receiverIndex}`]: (senderPointSums && sum) ? (cur.point / sum * 100).toFixed(2) + '%' : cur.point,
        [`point${senderIndex}`]: 'N/A',
      })
      return acc
    },
    [] as RenderData[]
  )
}

export default function Result() {
  const [roomId, setRoomId] = useState('')
  const [getResult, { data, error, loading }] = useLazyQuery<{
    roomById: NexusGenFieldTypes['Room'];
  }>(ResultQuery)

  // get roomId from query on load
  useEffect(() => {
    const rid = new URLSearchParams(window.location.search).get('id')
    if (!rid) return

    setRoomId(rid)
    getResult({ variables: { roomId: rid } })
  }, [])

  if (loading) {
    return <p> Loading...</p>
  }

  if (error || !data || !data.roomById.points) {
    return <p> Oops, somthing went wrong. {error?.message}</p>
  }

  const gifters = data.roomById.gifters
  const renderData = composeData(data.roomById.points, gifters)
  console.log('render', renderData)

  const senderSums:PointSums = new Map()
  data.roomById.points.forEach((p) => {
    const senderId = p?.senderId
    if(!senderId) return

    const value = senderSums.has(senderId) ? (senderSums.get(senderId) || 0) : 0
    senderSums.set(senderId, value + p?.point)
  })

  const renderPercentData = composeData(data.roomById.points, gifters, senderSums)

  const childrenColumns = gifters.map((g) => {
    const index = gifters.findIndex((gi) => gi?.gifter.id === g?.gifter.id)
    return {
      title: g?.gifter.name,
      dataIndex: 'point' + index.toString(),
      key: 'point' + index.toString(),
      width: 20,
      align: 'right',
      // sorter: (a, b) => a['point'] - b['point'],
    }
  })
  const columns: ColumnsType<RenderData> = [
    {
      title: 'Sender',
      dataIndex: 'senderName',
      key: 'senderName',
      width: 20,
      fixed: 'left',
    },
    {
      title: 'Point',
      children: childrenColumns,
      // align: 'center',
    },
  ]
  const columnsNormalized: ColumnsType<RenderData> = [
    {
      title: 'Sender',
      dataIndex: 'senderName',
      key: 'senderName',
      width: 20,
      fixed: 'left',
    },
    {
      title: 'Percent',
      children: childrenColumns,
      // align: 'center',
    },
  ]

  // show tables of each gifter and receiver
  return (
    <div>
      <h1 className='text-h'>Result of {data.roomById.name} <span className='prose prose-slate' >({roomId})</span></h1>

      <Table className='mt-8' columns={columns}
        dataSource={renderData} bordered size="middle"
        pagination={false}
        summary={_ => {
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell align='right' className='font-bold' index={0}>Share</Table.Summary.Cell>
                {gifters.map((g) => {
                  const index = gifters.findIndex((gi) => gi?.gifter.id === g?.gifter.id)
                  const percent = data.roomById.tempResult?.result[index]?.percent
                  if (!percent) {
                    return (
                      <Table.Summary.Cell align='right' className='font-bold' index={index} key={index}>
                  0%
                      </Table.Summary.Cell>
                    )
                  }
                  return (
                    <Table.Summary.Cell align='right' className='font-bold' index={index} key={index}>
                      {(percent * 100).toFixed(2)}%
                    </Table.Summary.Cell>
                  )
                })}
              </Table.Summary.Row>
            </>
          )
        }}
      ></Table>

      <Table className='mt-8' columns={columnsNormalized}
        dataSource={renderPercentData} bordered size="middle"
        pagination={false}
        summary={_ => {
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell align='right' className='font-bold' index={0}>Share</Table.Summary.Cell>
                {gifters.map((g) => {
                  const index = gifters.findIndex((gi) => gi?.gifter.id === g?.gifter.id)
                  const percent = data.roomById.tempResult?.result[index]?.percent
                  if (!percent) {
                    return (
                      <Table.Summary.Cell align='right' className='font-bold' index={index} key={index}>
                  0%
                      </Table.Summary.Cell>
                    )
                  }
                  return (
                    <Table.Summary.Cell align='right' className='font-bold' index={index} key={index}>
                      {(percent * 100).toFixed(2)}%
                    </Table.Summary.Cell>
                  )
                })}
              </Table.Summary.Row>
            </>
          )
        }}
      ></Table>
    </div>
  )
}