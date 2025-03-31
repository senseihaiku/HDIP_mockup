"use client"

import * as React from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, Line, Bar, ResponsiveContainer } from "recharts"

type ChartProps = {
  children: React.ReactNode
}

export const Chart = ({ children }: ChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {children}
    </ResponsiveContainer>
  )
}

type ChartContainerProps = {
  data: any[]
  children: React.ReactNode
}

export const ChartContainer = ({ data, children }: ChartContainerProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {React.cloneElement(children as React.ReactElement, { data })}
    </ResponsiveContainer>
  )
}

export const ChartGrid = ({
  horizontal = false,
  vertical = false,
}: {
  horizontal?: boolean
  vertical?: boolean
}) => {
  return <CartesianGrid strokeDasharray="3 3" horizontal={horizontal} vertical={vertical} />
}

type ChartXAxisProps = {
  dataKey?: string
  min?: number
  max?: number
}

export const ChartXAxis = ({ dataKey, min, max }: ChartXAxisProps) => {
  return <XAxis dataKey={dataKey} domain={[min || "auto", max || "auto"]} />
}

type ChartYAxisProps = {
  min?: number
  max?: number
}

export const ChartYAxis = ({ min, max }: ChartYAxisProps) => {
  return <YAxis domain={[min || "auto", max || "auto"]} />
}

export const ChartTooltip = () => {
  return <Tooltip />
}

type ChartLineSeriesProps = {
  name: string
  valueKey: string
  color?: string
}

export const ChartLineSeries = ({ name, valueKey, color }: ChartLineSeriesProps) => {
  return <Line type="monotone" dataKey={valueKey} stroke={color || "#8884d8"} name={name} />
}

type ChartLineProps = {
  type?: string
  dataKey: string
  stroke: string
}

export const ChartLine = ({ type, dataKey, stroke }: ChartLineProps) => {
  return <Line type={type || "monotone"} dataKey={dataKey} stroke={stroke} />
}

type ChartBarSeriesProps = {
  name: string
  valueKey: string
  color?: string
}

export const ChartBarSeries = ({ name, valueKey, color }: ChartBarSeriesProps) => {
  return <Bar dataKey={valueKey} fill={color || "#8884d8"} name={name} />
}

type ChartBarProps = {
  dataKey: string
  fill: string
}

export const ChartBar = ({ dataKey, fill }: ChartBarProps) => {
  return <Bar dataKey={dataKey} fill={fill} />
}

